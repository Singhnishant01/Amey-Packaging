import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid" data-aos="fade-up">

          {/* Company */}
          <div className="footer-column">
            <h2>Amey Packaging</h2>

            <p>
              Delivering premium packaging solutions with quality,
              innovation and customer satisfaction across India.
            </p>

            <div className="social-icons">

              <a
                href="https://www.facebook.com/share/17SeFnr82r/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/ameypackaging?igsh=cjl4NmF3azdoZjlt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://wa.me/919217445379"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
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

            <a href="#products">Non Woven Bags</a>
            <a href="#products">Garment Covers</a>
            <a href="#products">BOPP Bags</a>
            <a href="#products">Customized Bags</a>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3>Contact</h3>

            <a
              href="tel:+919217445379"
              className="contact-link"
            >
              <FaPhone />
              <span>+91 9217445379</span>
            </a>

            <a
              href="mailto:Ameypackaging80@gmail.com"
              className="contact-link"
            >
              <FaEnvelope />
              <span>Ameypackaging80@gmail.com</span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Jwalanagar%20Meerut"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <FaMapMarkerAlt />
              <span>Jwalanagar, Meerut</span>
            </a>

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