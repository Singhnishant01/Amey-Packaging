import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getEnquiries } from "../services/enquiryService";
import Sidebar from "../components/Sidebar";
import Products from "./Products";
import AddProduct from "./AddProduct";

function Dashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Category Filter
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnquiries = async () => {
  try {
    const data = await getEnquiries();
    setEnquiries(data);
  } catch (err) {
    console.error(err);
  }
};

 useEffect(() => {
  fetchProducts();
  fetchEnquiries();
}, []);

  // Categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search + Filter
  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  // Toggle Add Product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowAddProduct(!showAddProduct);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          overflowY: "auto",
        }}
      >
        <h1>📊 Dashboard</h1>

        <p>Welcome back, Admin!</p>

        {/* Dashboard Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h2>📦 Products</h2>
            <h1>{products.length}</h1>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h2>📩 Enquiries</h2>
            <h1>{enquiries.length}</h1>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h2>👤 Logged In</h2>
            <h1>Admin</h1>
          </div>
        </div>

        {/* Products Management */}

        <div style={{ marginTop: "50px" }}>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Search */}

            <input
              type="text"
              placeholder="🔍 Search Products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />

            {/* Category */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              style={{
                minWidth: "220px",
                padding: "12px 15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Button */}

            <button
              onClick={handleAddProduct}
              style={{
                padding: "12px 22px",
                border: "none",
                borderRadius: "8px",
                background: "#9a5318",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {showAddProduct
                ? "Close Form"
                : "+ Add Product"}
            </button>
          </div>

          {/* Add / Edit Form */}

          {showAddProduct && (
            <AddProduct
              refreshProducts={fetchProducts}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              setShowAddProduct={setShowAddProduct}
            />
          )}

          {/* Products */}

          <Products
            products={currentProducts}
            refreshProducts={fetchProducts}
            setEditingProduct={setEditingProduct}
            setShowAddProduct={setShowAddProduct}
          />

          {/* Pagination */}

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    style={{
                      padding: "8px 14px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      background:
                        currentPage === index + 1
                          ? "#9a5318"
                          : "#fff",
                      color:
                        currentPage === index + 1
                          ? "#fff"
                          : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;