import axios from "axios";
import { useEffect, useState } from "react";
import SpotifyConnect from "../components/sections/SpotifyConnect";

const exampleUser = {
  display_name: '',
}

const exampleTopArtists = {
  items: [],
}

function UserPage() {
  const queryParams = new URLSearchParams(window.location.search);

  const accessToken = queryParams.get('access_token');
  const token_type = queryParams.get('token_type');

  const [user, setUser] = useState(exampleUser);
  const [topArtists, setTopArtists] = useState(exampleTopArtists);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios('https://api.spotify.com/v1/me/', {
        headers: {
          Authorization: `${token_type} ${accessToken}`
        },
      })
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchTopArtists = async () => {
      try {
        const { data } = await axios('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `${token_type} ${accessToken}`
          },
          method: 'GET',
          json: true,
        })
        setTopArtists(data);

      } catch (e) {
        console.log(e);
      }
      
  }

  useEffect(() => {

    fetchUser();
    fetchTopArtists();
    setIsLoading(false);
    
  }, [])

  return (
    <>
      { isLoading ?
        <h1>I'm Loading</h1>
        :
        <>
          <h1>Welcome {user.display_name}</h1>
          <ol>
            {
              topArtists.items.map((artist) =>
                <li>
                  <img className='playlist_card__image' src={artist.images[2].url} alt={artist.name} /> 
                  <h3>{artist.name}</h3>
                </li>
              )
            }
          </ol>
        </>
      }
      <SpotifyConnect accessToken={accessToken}/>
    </>
  );
}

export default UserPage;