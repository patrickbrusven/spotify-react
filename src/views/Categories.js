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

  const localItems = items.map(item => ({...item, tags: []}));

  const filterItems = () => {
    if(filterValue) {
      return localItems.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
    return localItems;
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