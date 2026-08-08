import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const [productResponse, productsResponse] = await Promise.all([
          fetch(`${API_URL}/products/${id}`),
          fetch(`${API_URL}/products`),
        ]);

        if (!productResponse.ok) {
          throw new Error("Product not found");
        }

        if (!productsResponse.ok) {
          throw new Error("Unable to load products");
        }

        const productData = await productResponse.json();
        const productsData = await productsResponse.json();

        setProduct(productData);
        setAllProducts(productsData);
      } catch (err) {
        console.error("Product details error:", err);
        setError(err.message || "Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "150px" }}>
        Loading Product...
      </h2>
    );
  }

  if (error || !product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "150px" }}>
        Product Not Found
      </h2>
    );
  }

  const relatedProducts = allProducts
    .filter(
      (item) =>
        item.category === product.category &&
        item._id !== product._id
    )
    .slice(0, 3);

  return (
    <section className="product-details">
      <div className="container">

        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              console.error("Broken product image:", product.image);
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="details-content">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          {product.price !== undefined && (
            <h2 className="product-price">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </h2>
          )}

          <p>{product.description}</p>

          {product.features && product.features.length > 0 && (
            <>
              <h3>Key Features</h3>

              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>✔ {feature}</li>
                ))}
              </ul>
            </>
          )}

          {product.applications &&
            product.applications.length > 0 && (
              <>
                <h3>Applications</h3>

                <ul>
                  {product.applications.map(
                    (application, index) => (
                      <li key={index}>✔ {application}</li>
                    )
                  )}
                </ul>
              </>
            )}

          <div className="details-buttons">

            <a
              href={`https://wa.me/919217445379?text=${encodeURIComponent(
                `Hello, I am interested in ${product.name}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="details-btn"
            >
              Get Quote
            </a>

          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">

          <h2>You May Also Like</h2>

          <div className="products-grid">

            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="related-product-link"
              >
                <div className="product-card">

                  <div className="product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="product-content">

                    <span className="product-category">
                      {item.category}
                    </span>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;