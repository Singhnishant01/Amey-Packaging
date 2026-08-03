import "./About.css";
import aboutImage from "../../assets/about/about.jpg";

function About() {
  return (
    <section className="about" id="about">
      <div className="container">

        <div
          className="about-image"
          data-aos="fade-right"
        >
          <img
            src={aboutImage}
            alt="About Amey Packaging"
          />
        </div>

        <div
          className="about-content"
          data-aos="fade-left"
        >

          <span className="section-tag">
            About Us
          </span>

          <h2>
            Trusted Packaging
            <span> Partner</span>
          </h2>

          <p>
            Amey Packaging is committed to manufacturing premium-quality
            packaging solutions that combine durability, innovation,
            and elegant design. We serve retailers, garment brands,
            gift businesses and industries with customized packaging
            products.
          </p>

          <div className="about-list">

            <div>✔ Premium Quality Products</div>

            <div>✔ Eco-Friendly Materials</div>

            <div>✔ Custom Manufacturing</div>

            <div>✔ On-Time Delivery</div>

          </div>

          <div className="about-stats">

            <div className="about-box">
              <h3>500+</h3>
              <p>Happy Clients</p>
            </div>

            <div className="about-box">
              <h3>9+</h3>
              <p>Products</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;