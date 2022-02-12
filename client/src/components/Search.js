
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
    < div >
    <div className='home' style={{padding:'100px'}}>
        <h2>Search</h2>
    </div>
        <div className="ui action input" id='searchbar'>
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
    </div>
  );
};

export default Search;
