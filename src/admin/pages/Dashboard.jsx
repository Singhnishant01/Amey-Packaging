import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    enquiries: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // We will connect APIs in the next step
      setStats({
        products: 0,
        enquiries: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "35px",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          📊 Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
          }}
        >
          Welcome back, Admin
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Products</h3>
            <h1>{stats.products}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Enquiries</h3>
            <h1>{stats.enquiries}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Logged In</h3>
            <h1>Admin</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 5px 20px rgba(0,0,0,.08)",
};

export default Dashboard;