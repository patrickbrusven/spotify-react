import { useState } from "react";
import BaseInput from '../components/BaseInput';

const CategoryCard = (
  {
    category,
    selectCategory
  }
) => {
  const [localCategory, setLocalCategory] = useState(category);
  const [showAddTag, setShowAddTag] = useState(false);
  const [ inputValue, setInputValue] = useState('');

  const handleShowTag = () => {
    setShowAddTag(!showAddTag);
  }

  const submitTag = () => {
    let copyCat = localCategory;
    if(inputValue !== "") {
      copyCat.tags.push(inputValue);
      setInputValue('');
      setLocalCategory(copyCat);
    }
    handleShowTag();
  }

  const handleInputChanged = (inputString) => {
    setInputValue(inputString);
  }
  return (
    <>
      <div className="cat-card" onClick={() => selectCategory(localCategory.id)}>
        <p className="cat-card__heading">{localCategory.name}</p>
        <img className="cat-card__bg-image" src={localCategory.icons[0].url} alt={localCategory.name} />
      </div>
      <button onClick={handleShowTag}>{ showAddTag ? 'Cancel' : 'Add Tag'} </button>
      { showAddTag && 
        <>
          <BaseInput inputChanged={handleInputChanged} inputValue={inputValue} placeholder={''} />
          <button onClick={submitTag}>Save</button>
        </>
      }
      {localCategory.tags && localCategory.tags.map((tag, index) => 
        <span key={index}>{tag}</span>
      )}
    </>
  )
}

export default CategoryCard;