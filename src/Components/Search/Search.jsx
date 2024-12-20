// Add instant search with highlights and suggestions
const SearchBar = () => {
  return (
    <div className="search-container">
      <input 
        type="text"
        className="search-input"
        placeholder="Search products..."
        onChange={handleInstantSearch}
      />
      <div className="search-suggestions">
        {suggestions.map(item => (
          <div className="suggestion-item">
            <HighlightText text={item.name} highlight={searchTerm} />
            <small className="category">{item.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
}; 