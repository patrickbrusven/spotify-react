import CategoryCard from '../components/CategoryCard.js';
import BaseInput from '../components/BaseInput.js';
import { useState } from 'react';
import '../assets/scss/CategoryStyles.scss'
import React from 'react';

const Categories = ({
  categories,
  token,
  selectCategory,
  submitTag,
}) => {
  const [ filterByNameValue, setFilterByNameValue] = useState('');
  const [ filterByTagValue, setFilterByTagValue] = useState('');

  const filterItems = () => {
    let filteredCategories = categories;
    if( filterByNameValue ) {
      filteredCategories = filteredCategories.filter(item => item.name.toLowerCase().includes(filterByNameValue.toLowerCase()))
    }
    if( filterByTagValue ) {
      filteredCategories = filteredCategories.filter(item => {
        let hasTag = false;
        for (let i = 0; i < item.tags.length; i++) {
          const tag = item.tags[i];
          if ( tag.toLowerCase().includes(filterByTagValue.toLowerCase()) ) {
            hasTag = true;
          }
        }
        return hasTag;
      })
    }
    return filteredCategories;
  }
  
  const handleFilterByNameChange = (inputString) => {
    setFilterByNameValue(inputString);
  }

  const handleFilterByTagChange = (inputString) => {
    setFilterByTagValue(inputString);
  }

  return (
    <div className="categories">
      <h2 className="categories__heading">Categories</h2>
      <BaseInput placeholder={'filter Categories by name'} inputChanged={handleFilterByNameChange} inputValue={filterByNameValue} />
      <BaseInput placeholder={'filter Categories by tag'} inputChanged={handleFilterByTagChange} inputValue={filterByTagValue} />
      <ul className="categories__list">
        {filterItems().map((item) => 
          <li key={item.id}>
            {item ? <CategoryCard category={item}  selectCategory={selectCategory} submitTag={submitTag} /> : <h1>No Item</h1>}
          </li>
        )}
      </ul>
    </div>
    
  ) 
};

export default Categories;