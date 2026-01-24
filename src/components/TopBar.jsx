const TopBar = ({ query, onQueryChange }) => (
  <header className="top-bar">
    <div className="logo">AUFlix</div>
    <div className="search">
      <input
        type="search"
        placeholder="Search trailers"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </div>
  </header>
);

export default TopBar;
