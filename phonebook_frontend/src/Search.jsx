function Search({ filterKeyword, setFilterKeyword }) {
  return (
    <div>
      <label htmlFor="search-by-name">search by name</label>
      <input
        type="text"
        id="search-by-name"
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
      />
    </div>
  );
}

export default Search;
