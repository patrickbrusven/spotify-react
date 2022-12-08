import { useState } from "react";
import BaseInput from '../baseUI/BaseInput';

const CategoryCard = (
  {
    category,
    selectCategory,
    submitTag,
  }
) => {
  const [showAddTag, setShowAddTag] = useState(false);
  const [ inputValue, setInputValue] = useState('');

  const handleShowTag = () => {
    setShowAddTag(!showAddTag);
  }

  const handleTag = () => {
    if(inputValue !== "") {
      submitTag(category.id, inputValue)
      setInputValue('');
    }
    handleShowTag();
  }

  const handleInputChanged = (inputString) => {
    setInputValue(inputString);
  }
  return (
    <>
      <div className="cat-card" onClick={() => selectCategory(category.id)}>
        <p className="cat-card__heading">{category.name}</p>
        <img className="cat-card__bg-image" src={category.icons[0].url} alt={category.name} />
      </div>
      <button onClick={handleShowTag}>{ showAddTag ? 'Cancel' : 'Add Tag'} </button>
      { showAddTag && 
        <>
          <BaseInput inputChanged={handleInputChanged} inputValue={inputValue} placeholder={''} />
          <button onClick={handleTag}>Save</button>
        </>
      }
      {category.tags && category.tags.map((tag, index) => 
        <span key={index}>{tag}</span>
      )}
    </>
  )
}

export default CategoryCard;