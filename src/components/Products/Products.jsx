import { useEffect, useMemo, useState } from "react";
import "./Products.css";
import ProductCard from "../ProductCard/ProductCard";

function Products() {
  const [productsData, setProductsData] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        // Debug: Check what is coming from MongoDB
        console.log(data);

        setProductsData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(productsData.map((item) => item.category)),
  ];

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [productsData, category, search]);

  return (
    <section className="products" id="products">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <span>Our Products</span>
          <h2>Premium Packaging Solutions</h2>
          <p>
            Explore our complete range of premium packaging products.
          </p>
        </div>

        <div className="product-search">
          <input
            type="text"
            name="productSearch"
            id="productSearch"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="product-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active-filter" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="products-grid" data-aos="fade-up">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;