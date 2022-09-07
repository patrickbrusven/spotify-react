import React, { useState } from "react";
import SpotifyService from '../services/api/SpotifyWebApi.js';
import CategoryCard from '../components/CategoryCard.js';

const Categories = ({
  options,
  options: {
    categories: {
      href,
      items,
      limit,
      next,
      offset,
      previous,
      total
    }
  },
  token
}) => {
  const [playlists, setPlaylists] = useState(null);

  const setCategoryPlaylists = async (id) => {
    try {
      const { data } = await SpotifyService.getCategoryPlaylists(token, id)
      setPlaylists(data);
    } catch (error) {
      console.log('setCategoryPlaylists', error);
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {items.map((item) => 
          <li key={item.id}>
            {item ? <CategoryCard category={item}  selectCategory={setCategoryPlaylists}/> : <h1>No Item</h1>}
          </li>
        )}
      </ul>
    </div>
    
  ) 
};

export default Categories;