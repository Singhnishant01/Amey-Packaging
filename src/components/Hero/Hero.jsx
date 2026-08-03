import "./Hero.css";
import heroImage from "../../assets/images/hero.png";
import Counter from "../Counter/Counter";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* Left Content */}

        <div
          className="hero-content"
          data-aos="fade-right"
        >

          <span className="hero-tag">
            Premium Packaging Manufacturer
          </span>

          <h1>
            Premium <span>Packaging</span>
            <br />
            Solutions
          </h1>

          <p>
            Amey Packaging specializes in premium non-woven bags,
            garment covers, BOPP laminated bags, D-cut bags,
            loop handle bags and customized packaging solutions
            designed for businesses, retailers and fashion brands.
          </p>

          <div className="hero-buttons">

            <a
              href="#products"
              className="primary-btn"
            >
              Explore Products
            </a>

            <a
              href="#contact"
              className="secondary-btn"
            >
              Contact Us
            </a>

          </div>

          <div className="hero-features">

            <span>✔ Premium Quality</span>
            <span>✔ Custom Branding</span>
            <span>✔ Bulk Orders</span>
            <span>✔ Fast Delivery</span>

          </div>

        </div>

        {/* Hero Image */}

        <div
          className="hero-image"
          data-aos="fade-left"
        >

          <img
            src={heroImage}
            alt="Amey Packaging"
          />

        </div>

      </div>

      {/* Hero Stats */}

      <div
        className="hero-stats"
        data-aos="fade-up"
      >

        <div className="stat-card">

          <h2>
            <Counter end={500} />
            +
          </h2>

          <p>Bulk Orders</p>

        </div>

        <div className="stat-card">

          <h2>
            <Counter end={9} />
            +
          </h2>

          <p>Premium Products</p>

        </div>

        <div className="stat-card">

          <h2>
            <Counter
              end={100}
              suffix="%"
            />
          </h2>

          <p>Quality Check</p>

        </div>

      </div>

    </section>
  );
}

export default Hero;