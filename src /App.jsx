import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useEffect } from 'react';
import FilmCard from './components/FilmCard';
import { useFilmStore, usePostStore } from './store';
import MyDrawer from './components/MyDrawer'
import FilmPostModal from './components/FilmPostModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { films, getFilms } = useFilmStore();
  const { getPosts } = usePostStore();
  
  useEffect(() => {
    getPosts(10, 1)
    getFilms(10, 1)
  }, [getFilms, getPosts])
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <MyDrawer></MyDrawer>
      <Box component="main" sx={{ py: 3, px: 10, display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
        <Toolbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          {films.map(e => <FilmCard key={e.film_id + e.title} film={e} ></FilmCard>)}
        </Box>
      </Box>
      <FilmPostModal></FilmPostModal>
      <ToastContainer position="bottom-center"/>
    </Box>
  );
}

export default App;
