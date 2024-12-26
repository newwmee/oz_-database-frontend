import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useModalStore, usePostStore } from "../store";

export default function FilmCard(props) {
  const { film } = props;
  const { posts, setCurrentPost } = usePostStore();
  const { openModal } = useModalStore();
  const handleOpen = () => {
    const currentPost = posts.find(p => p.film_id === film.film_id)
    currentPost.film = { 
      title: film.title
    } 
    setCurrentPost(currentPost);
    openModal();
  }
  
  return (
    <Box sx={{ minWidth: 275, mb: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            {film.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {film.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>Check Post</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
