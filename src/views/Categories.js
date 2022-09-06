import axios from "axios";
import React, { useState } from "react";
import SpotifyService from '../services/api/SpotifyWebApi.js';

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
  const [data, setData] = useState(null);

  const handleClick = async (id) => {
    console.log(id);
    try {
      const { data } = await SpotifyService.getCategoryPlaylists(token, id)
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {items.map((item) => 
          <li key={item.id}> 
            <p>{item.name}</p>
            <img src={item.icons[0].url} alt={item.name} onClick={() => handleClick(item.id)} />
          </li>
        )}
      </ul>
    </div>
    
  ) 
};

export default Categories;