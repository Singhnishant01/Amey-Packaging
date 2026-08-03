import { Link, NavLink } from "react-router-dom";
import { logoutAdmin } from "../services/authService";

function Sidebar() {
  const handleLogout = () => {
    logoutAdmin();
    window.location.href = "/admin/login";
  };

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1f2937",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>Amey Admin</h2>

      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <Link
          to="/admin/dashboard"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          📦 Products
        </Link>

        <Link
          to="/admin/add-product"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          ➕ Add Product
        </Link>
        <NavLink to="/admin/enquiries">
          📩 Enquiries
        </NavLink>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;