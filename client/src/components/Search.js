import { useNavigate } from "react-router";

const Search = (props) => {
  const navigate = useNavigate();

  const searchQuery = props.searchQuery;
  const setSearchQuery = props.setSearchQuery;
  const searchBy = props.searchBy;
  const setSearchBy = props.setSearchBy;

  function searchText(e) {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.advsearch.value === "name") {
      navigate(`/search/byname/${searchQuery}`);
    } else if (e.target.advsearch.value === "tags") {
      navigate(`/search/bytags/${searchQuery}`);
    } else {
      navigate(`/search/byduration/${searchQuery}`);
    }
  };

  return (
    <div className="homepage">
      <div id="homebanner">
        <h1 className="titles">Search</h1>
      </div>
      <div className="advancedsearch">
        <form onSubmit={handleSubmit} style={{width:'100%'}}>
          <div className="ui category search">
            <div class="ui icon input" id="searchbar">
              <input
                className="prompt"
                name="s"
                value={searchQuery}
                onChange={searchText}
                type="text"
                placeholder="Search..."
                required
              />
            </div>
            <div class="results"></div>
          </div>
          <h3>filter by</h3>
          <input
            type="radio"
            id="searchname"
            name="advsearch"
            value="name"
            checked="checked"
          />
          <label style={{ marginRight: "20px" }} htmlFor="searchname">
            Name
          </label>

          <input type="radio" id="searchtag" name="advsearch" value="tags" />
          <label style={{ marginRight: "20px" }} htmlFor="searchtag">
            Tags
          </label>

          <input
            type="radio"
            id="searchduration"
            name="advsearch"
            value="duration"
          />
          <label htmlFor="searchduration">Duration(in mins)</label>
          <br />
          <button
            className="ui button yellow"
            type="submit"
            style={{ color: "black", marginTop: "20px" }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
