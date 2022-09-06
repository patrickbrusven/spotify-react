import logo from './logo.svg';
import './App.css';
import SpotifyService from './services/api/SpotifyWebApi.js'
import Categories from './views/Categories.js'
import React, { useEffect, useState } from 'react'

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {categories ? <Categories options={categories} token={accessToken} /> : <h1>No Categories</h1>}
      </header>
    </div>
  );
}

export default App;
