import React from "react";

const CategoryCard = (
  {
    category,
    selectCategory
  }
) => {
  return (
    <div>
      <p>{category.name}</p>
      <img src={category.icons[0].url} alt={category.name} onClick={() => selectCategory(category.id)} />
    </div>
  )
}

export default CategoryCard;