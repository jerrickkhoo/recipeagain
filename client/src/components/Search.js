import React from "react";

const Search = ({ searchQuery, handleSearch }) => {
  return (
    <>
      <form action="/" method="get">
        <div className="ui action input">
          <input
            name="s"
            value={searchQuery}
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
          />
          <button type="submit" className="ui button teal">
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
