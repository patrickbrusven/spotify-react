import './App.css';
import LandingPage from './views/LandingPage.js'
import ExplorePage from './views/ExplorePage';
import SpotifyService from './services/api/SpotifyWebApi.js'

import Me from './views/Me.js'
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './assets/scss/main.scss'

function App() {
  const [accessToken, setAccessToken] = useState('');
  
  useEffect( () => {
    const fetchToken = async () => {
      try {
        const { data } = await SpotifyService.getToken();
        setAccessToken(data.access_token);
      } catch (error) {
        console.log('fetchToken', error);
      }
    }
    fetchToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
          <LandingPage />
        }
      />
      <Route path="/explore" element={
          <ExplorePage accessToken={accessToken}/>
        }
      />
      <Route path="/me" element={
          <div className="App">
            <Me/>
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
