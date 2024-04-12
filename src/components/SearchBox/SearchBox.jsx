
import css from "./SearchBox.module.css";

const SearchBox = ({onChangeFilter, filter}) => {
    
    
  return (
    <div className={css.search}>
        <h3 className={css.searchHeader}>Find contacts by name</h3>
        <input className={css.searchInput} type="text" value={filter} onChange={onChangeFilter}></input>
    </div>
  )
}

export default SearchBox