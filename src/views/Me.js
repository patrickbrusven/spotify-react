import axios from "axios";
import { useEffect, useState } from "react";
import SpotifyConnect from "../components/SpotifyConnect";


function Me() {
  const queryParams = new URLSearchParams(window.location.search);

  const accessToken = queryParams.get('access_token');
  const token_type = queryParams.get('token_type');

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `${token_type} ${accessToken}`
          },
          method: 'GET',
          json: true,
        })
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
    
  }, [])

  return (
    <>
      {isLoading ?
        <h1>I'm Loading</h1>
        :
        <h1>I'm not Loading</h1>
      }
      <SpotifyConnect accessToken={accessToken}/>
    </>
  );
}

export default Me;