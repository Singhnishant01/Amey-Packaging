import "./Products.css";
import { deleteProduct } from "../services/productService";

function Products({
  products,
  refreshProducts,
  setEditingProduct,
  setShowAddProduct,
}) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      await refreshProducts();
    } catch (err) {
      console.error(err);
      alert("Unable to delete product");
    }
  };

  // Generate correct image URL
  const getImageUrl = (image) => {
    if (!image) return "";

    const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

    // Uploaded images from backend
    if (image.startsWith("/uploads")) {
      return `${BASE_URL}${image}`;
    }

    // Already full URL
    if (image.startsWith("http")) {
      return image;
    }

    // Images stored in React public folder
    return image;
  };

  return (
    <div className="admin-products">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Products Found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowAddProduct(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;