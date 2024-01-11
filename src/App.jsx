import { useEffect } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import NotFound from './pages/404/NotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import Home from './pages/home/Home';
import SearchResult from './pages/searchResult/SearchResult';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home)
  console.log(url)

  const fetchMovie = ()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
      console.log(res)

      const url={
        backdrop:`${res.images.secure_base_url}original`,
        poster:`${res.images.secure_base_url}original`,
        profile:`${res.images.secure_base_url}original`
      }

      dispatch(getApiConfiguration(url))
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  const genresCall = async () =>{
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGeners = {};

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    
    data?.map(({genres})=>{
      return genres.map((item)=> ( allGeners[item.id] = item))
    })

    dispatch(getGenres(allGeners))
    
  }

  useEffect(()=>{
    fetchMovie();
    genresCall();
  },[])

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
