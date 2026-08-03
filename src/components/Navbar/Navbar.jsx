import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={scrolled ? "header scrolled" : "header"}>
      <div className="container">
        <nav className="navbar">

          <a href="/" className="logo">
            <img src={logo} alt="Amey Packaging" />
          </a>

          <ul className={menuOpen ? "nav-links active" : "nav-links"}>

            <li><a href="#home" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#products" onClick={closeMenu}>Products</a></li>
            <li><a href="#why-us" onClick={closeMenu}>Why Us</a></li>
            <li><a href="#industries" onClick={closeMenu}>Industries</a></li>
            <li><a href="#process" onClick={closeMenu}>Process</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>

          </ul>

          <button className="login-btn">
            Login
          </button>

          <div
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;