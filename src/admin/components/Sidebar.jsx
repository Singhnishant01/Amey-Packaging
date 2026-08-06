import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    marginBottom: "8px",
    borderRadius: "10px",
    textDecoration: "none",
    color: isActive ? "#fff" : "#d6d6d6",
    background: isActive ? "#9a5318" : "transparent",
    fontWeight: "600",
    transition: "0.3s",
  });

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#1f2937",
        color: "#fff",
        padding: "30px 20px",
        position: "sticky",
        top: 0,
      }}
    >
      <h2
        style={{
          marginBottom: "35px",
          textAlign: "center",
        }}
      >
        Amey Admin
      </h2>

      <NavLink to="/admin/dashboard" style={linkStyle}>
        📊 Dashboard
      </NavLink>

      <NavLink to="/admin/products" style={linkStyle}>
        📦 Products
      </NavLink>

      <NavLink to="/admin/enquiries" style={linkStyle}>
        📩 Enquiries
      </NavLink>

      <NavLink to="/admin/profile" style={linkStyle}>
        👤 Profile
      </NavLink>

      <NavLink to="/admin/settings" style={linkStyle}>
        ⚙️ Settings
      </NavLink>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "40px",
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background: "#dc2626",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;