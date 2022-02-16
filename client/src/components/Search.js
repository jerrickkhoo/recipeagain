import { useNavigate } from "react-router";

const Search = (props) => {
  const navigate = useNavigate();

  const searchQuery = props.searchQuery;
  const setSearchQuery = props.setSearchQuery;

  function searchText(e) {
    setSearchQuery(e.target.value);
  }

  function handleClick() {
    navigate(`/search/${searchQuery}`);
  }

  return (
    <div className="home">
      <div id="homebanner">
        <h1 className="titles">Search</h1>
      </div>
      <div
        className="ui action input"
        id="searchbar"
      >
        <input
          name="s"
          value={searchQuery}
          onChange={searchText}
          type="text"
          placeholder="Search..."
        />
        <button className="ui button yellow" onClick={handleClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
