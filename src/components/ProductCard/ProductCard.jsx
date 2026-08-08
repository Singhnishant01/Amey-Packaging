import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={() => console.log("Broken image:", product.image)}
        />
      </div>

      <div className="product-content">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-buttons">

          <Link
            to={`/products/${product._id}`}
            className="details-btn"
          >
            View Details
          </Link>

          <a
            href={`https://wa.me/+917970527373?text=Hello, I am interested in ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="quote-btn"
          >
            Get Quote
          </a>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;