
import { useNavigate } from "react-router";



const Search = (props) => {
  const navigate = useNavigate();

  const searchQuery = props.searchQuery
  const setSearchQuery = props.setSearchQuery

function searchText (e) {
  setSearchQuery(e.target.value)
}

function handleClick () {
  navigate(`/recipe/search/${searchQuery}`)
}


  return (
    <>
        <div className="ui action input">
          <input
            name="s"
            value={searchQuery}
            onChange={searchText}
            type="text"
            placeholder="Search..."
          />
          <button className="ui button teal" onClick={handleClick}>
            Search
          </button>
        </div>
    </>
  );
};

export default Search;
