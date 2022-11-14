import CategoryCard from '../components/CategoryCard.js';
import BaseInput from '../components/BaseInput.js';
import { useState } from 'react';
import '../assets/scss/CategoryStyles.scss'
import React from 'react';

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
}) => {
  const [ inputValue, setInputValue] = useState('');
  const localItems = items.map(item => ({...item, tags: []}));

  const filterItems = () => {
    if( inputValue ) {
      return localItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return localItems;
  }
  
  const handleInputChanged = (inputString) => {
    setInputValue(inputString);
  }

  return (
    <div className="categories">
      <h2 className="categories__heading">Categories</h2>
      <BaseInput placeholder={'filter Categories by name'} inputChanged={handleInputChanged} inputValue={inputValue} />
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