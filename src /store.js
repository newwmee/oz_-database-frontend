import { create } from "zustand";
import api from "./api";
import { toast } from "react-toastify";
import { devtools } from "zustand/middleware";
import { useCommentStore } from "./store";

const { updateComment, deleteComment } = useCommentStore();

updateComment(commentId, "새로운 댓글 내용");
deleteComment(commentId);
const DEV = import.meta.env.DEV;

export const useFilmStore = create(
  devtools(
    (set) => ({
      films: [],
      getFilms: async (limit, page) => {
        try {
          const res = await api.get(`/film?limit=${limit}&page=${page}`);
          set({ films: res.data.data });
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("no films");
        }
      },
    }),
    {
      name: "filmStore",
    }
  )
);

const nullPost = {
  post_id: 0,
  film_id: 0,
  content: "",
  created_at: "2024-09-01T08:00:00.000Z",
  updated_at: "2024-09-01T08:00:00.000Z",
  film: {
    title: "",
  },
};

export const usePostStore = create(
  devtools(
    (set) => ({
      posts: [],
      // null or object
      currentPost: nullPost,
      setPosts: async (posts) => {
        set({ posts });
      },
      setCurrentPost: async (post) => {
        set({ currentPost: post });
      },
      getOnePost: async (id) => {
        try {
          const res = await api.get(`/film/post/${id}`);
          set({ currentPost: res.data.data });
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error(`no ${id} post`);
        }
      },
      getPosts: async (limit, page) => {
        try {
          const res = await api.get(`/film/post?limlt=${limit}&page=${page}`);
          set({ posts: res.data.data });
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error(`no posts`);
        }
      },
      empty: async () => set({ currentPost: nullPost }),
    }),
    {
      name: "postStore",
    }
  )
);

export const useLikeStore = create(
  devtools(
    (set) => ({
      count: 0,
      isLiked: false,
      getCount: async (postId) => {
        try {
          const res = await api.get(`/film/post/like/${postId}?count=true`);
          set({ count: res.data.count });
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("no like count");
        }
      },
      getIsLiked: async (postId, customerId) => {
        try {
          const res = await api.get(
            `/film/post/like/${postId}/customer/${customerId}`
          );
          set({ isLiked: res.data.isLiked });
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("no isLiked");
        }
      },
      like: async (postId, customerId) => {
        try {
          await api.post(`/film/post/like`, {
            reactionType: "LIKE",
            customerId,
            postId,
          });
          set(({ count }) => ({ count: count + 1, isLiked: true }));
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("like failed");
        }
      },
      unlike: async (postId, customerId) => {
        try {
          await api.delete(`/film/post/like/${postId}/customer/${customerId}`);
          set(({ count }) => ({ count: count - 1, isLiked: false }));
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("unlike failed");
        }
      },
    }),
    {
      name: "likeStore",
    }
  )
);

export const useCommentStore = create(
  devtools(
    (set) => ({
      comments: [],
      getComments: async (postId, limit, page) => {
        try {
          const res = await api.get(
            `film/post/${postId}/comment/?limit=${limit}&page=${page}`
          );
          set({ comments: res.data.data });
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("getComments failed");
        }
      },
      createComment: async (postId, customerId, comment) => {
        try {
          await api.post(`film/post/${postId}/comment`, {
            postId,
            customerId,
            content: comment,
          });
          toast.success("댓글이 추가되었습니다.");
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("createComment failed");
        }
      },
      updateComment: async (commentId, updatedContent) => {
        try {
          await api.put(`/film/post/comment/${commentId}`, {
            content: updatedContent,
          });
          set((state) => ({
            comments: state.comments.map((comment) =>
              comment.comment_id === commentId
                ? { ...comment, content: updatedContent }
                : comment
            ),
          }));
          toast.success("댓글이 수정되었습니다.");
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("댓글 수정에 실패했습니다.");
        }
      },
      deleteComment: async (commentId) => {
        try {
          await api.delete(`/film/post/comment/${commentId}`);
          set((state) => ({
            comments: state.comments.filter(
              (comment) => comment.comment_id !== commentId
            ),
          }));
          toast.success("댓글이 삭제되었습니다.");
        } catch (e) {
          DEV && console.error(e.stack);
          toast.error("댓글 삭제에 실패했습니다.");
        }
      },
    }),
    { name: "commentStore" }
  )
);

export const useModalStore = create(
  devtools(
    (set) => ({
      isOpen: false,
      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
    }),
    {
      name: "modalStore",
    }
  )
);
