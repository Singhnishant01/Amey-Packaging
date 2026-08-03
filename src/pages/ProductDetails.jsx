import ProductCard from "../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import products from "../data/products";

function ProductDetails() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 3);

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "150px" }}>
        Product Not Found
      </h2>
    );
  }

  return (
    <section className="product-details">

      <div className="container">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-content">

          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <h3>Key Features</h3>

          <ul>

            <li>✔ Premium Quality Material</li>

            <li>✔ Custom Branding Available</li>

            <li>✔ Durable & Reusable</li>

            <li>✔ Bulk Order Support</li>

            <li>✔ Fast Delivery Across India</li>

          </ul>

          <div className="details-buttons">

            <a
              href={`https://wa.me/91XXXXXXXXXX?text=Hello, I am interested in ${product.name}`}
              className="details-btn"
            >
              Get Quote
            </a>

          </div>

        </div>

      </div>

      <div className="related-products">

        <h2>You May Also Like</h2>

        <div className="products-grid">

          {relatedProducts.map((item) => (

            <ProductCard
              key={item.id}
              product={item}
            />

          ))}

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;