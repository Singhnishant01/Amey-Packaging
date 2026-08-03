import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid"
          data-aos="fade-up">

          {/* Company */}

          <div className="footer-column">

            <h2>Amey Packaging</h2>

            <p>
              Delivering premium packaging solutions with quality,
              innovation and customer satisfaction across India.
            </p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaWhatsapp />
              </a>

            </div>

          </div>

          {/* Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>

          </div>

          {/* Products */}

          <div className="footer-column">

            <h3>Products</h3>

            <a href="#">Non Woven Bags</a>
            <a href="#">Garment Covers</a>
            <a href="#">BOPP Bags</a>
            <a href="#">Customized Bags</a>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3>Contact</h3>

            <p>Chaibasa, Jharkhand</p>

            <p>+91 XXXXX XXXXX</p>

            <p>info@ameypackaging.com</p>

          </div>

        </div>

        <div className="footer-bottom">

          © {new Date().getFullYear()} Amey Packaging.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;