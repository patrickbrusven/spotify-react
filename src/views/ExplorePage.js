import { useState, useEffect } from 'react'
import Categories from '../components/sections/Categories.js'
import Playlists from '../components/sections/Playlists.js'
import SpotifyService from '../services/api/SpotifyWebApi.js'

function ExplorePage(props) {
  const [categories, setCategories] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect( () => {
    fetchCategories(props.accessToken);
  }, []);

  const fetchCategories = async (token) => {
    try {
      const { data } = await SpotifyService.getCategories(props.accessToken);
      const addTagsKey = data.categories.items.map(item => ({...item, tags: []}));
      setCategories(addTagsKey);
    } catch (error) {
      console.log('fetchCategories', error);
    }
  }

  const fetchCategoryPlaylists = async (id) => {
    try {
      const { data } = await SpotifyService.getCategoryPlaylists(props.accessToken, id)
      setPlaylists(data);
    } catch (error) {
      console.log('setCategoryPlaylists', error);
    }
  }

  const addTagToCategorie = (id, tag) => {
    const addTag = categories.map(item => {
      if (item.id === id) {
        item.tags.push(tag);
      };
      return item;
    });
    setCategories(addTag);
  }

  const fetchPlaylistTracks = async (id) => {
    try {
      const { data } = await SpotifyService.getPlaylistTracks(props.accessToken, id)
      setTracks(data);
    } catch (error) {
      console.log('fetchPlaylistTracks', error);
    }
  }

  return (
    <div className="App">
      {categories ? <Categories categories={categories} token={props.accessToken} selectCategory={fetchCategoryPlaylists} submitTag={addTagToCategorie} /> : <h1>No Categories</h1>}
      {playlists ? <Playlists options={playlists} token={props.accessToken} selectPlaylist={fetchPlaylistTracks} /> : <h1>No Playlists</h1>}
    </div>
  )
}

export default ExplorePage