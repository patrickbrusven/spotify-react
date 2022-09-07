import './App.css';
import SpotifyService from './services/api/SpotifyWebApi.js'
import Categories from './views/Categories.js'
import React, { useEffect, useState } from 'react'
import './assets/scss/main.scss'

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [categories, setCategories] = useState(null);

  useEffect( () => {
    const fetchToken = async () => {
      try {
        const { data } = await SpotifyService.getToken();
        setAccessToken(data.access_token)
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
      setCategories(data)
    } catch (error) {
      console.log('fetchCategories', error);
    }
  }

  return (
    <div className="App">
      {categories ? <Categories options={categories} token={accessToken} /> : <h1>No Categories</h1>}
    </div>
  );
}

export default App;
