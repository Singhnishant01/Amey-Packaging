import "../styles/products.css";

function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  onAddProduct,
}) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="🔍 Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <button
        className="primary-btn"
        onClick={onAddProduct}
      >
        + Add Product
      </button>
    </div>
  );
}

export default SearchBar;