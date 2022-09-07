const CategoryCard = (
  {
    category,
    selectCategory
  }
) => {
  return (
    <div className="cat-card" onClick={() => selectCategory(category.id)}>
      <p className="cat-card__heading">{category.name}</p>
      <img className="cat-card__bg-image" src={category.icons[0].url} alt={category.name} />
    </div>
  )
}

export default CategoryCard;