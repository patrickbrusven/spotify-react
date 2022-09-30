import React, { useState } from "react";
import SpotifyService from '../services/api/SpotifyWebApi.js';
import CategoryCard from '../components/CategoryCard.js';
import '../assets/scss/CategoryStyles.scss'

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
  token,
  selectCategory,
  filterValue,
}) => {
  const filterItems = () => {
    if(filterValue) {
      return items.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
    return items;
  } 
  return (
    <div className="categories">
      <h2 className="categories__heading">Categories</h2>
      <ul className="categories__list">
        {filterItems().map((item) => 
          <li key={item.id}>
            {item ? <CategoryCard category={item}  selectCategory={selectCategory}/> : <h1>No Item</h1>}
          </li>
        )}
      </ul>
    </div>
    
  ) 
};

export default Categories;