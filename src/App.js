import './App.css';
import SpotifyService from './services/api/SpotifyWebApi.js'
import Categories from './views/Categories.js'
import Playlists from './views/Playlists.js'
import ArrowRight from './assets/svgs/ArrowRight';
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './assets/scss/main.scss'

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [categories, setCategories] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [tracks, setTracks] = useState(null);
  const navigate = useNavigate();
  useEffect( () => {
    const fetchToken = async () => {
      try {
        const { data } = await SpotifyService.getToken();
        setAccessToken(data.access_token);
        fetchCategories(data.access_token);
      } catch (error) {
        console.log('fetchToken', error);
      }
    }
    fetchToken();
  }, []);

  const fetchCategories = async (token) => {
    try {
      const { data } = await SpotifyService.getCategories(token);
      setCategories(data);
    } catch (error) {
      console.log('fetchCategories', error);
    }
  }

  const fetchCategoryPlaylists = async (id) => {
    try {
      const { data } = await SpotifyService.getCategoryPlaylists(accessToken, id)
      setPlaylists(data);
    } catch (error) {
      console.log('setCategoryPlaylists', error);
    }
  }

  const fetchPlaylistTracks = async (id) => {
    try {
      const { data } = await SpotifyService.getPlaylistTracks(accessToken, id)
      setTracks(data);
    } catch (error) {
      console.log('fetchPlaylistTracks', error);
    }
  }

  const handleTransition = (e, route) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(route);
    }, 1000);
  }

  return (
    <Routes>
      <Route path="/" element={
          <div className="App centered-layout">
            <h1>Splorify</h1>
            <Link to="/explore" className="base-anchor" onClick={e => handleTransition(e, '/explore')} >
              <p>EXPLORE</p><ArrowRight />
            </Link>
          </div>
        }
      />
      <Route path="/explore" element={
          <div className="App">
            {categories ? <Categories options={categories} token={accessToken} selectCategory={fetchCategoryPlaylists} /> : <h1>No Categories</h1>}
            {playlists ? <Playlists options={playlists} token={accessToken} selectPlaylist={fetchPlaylistTracks} /> : <h1>No Playlists</h1>}
          </div>
        }
      />
      <Route path="*" element={
          <div className="App">
            <h1>404 Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
