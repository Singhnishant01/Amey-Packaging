import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

function Profile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();

    if (data.success) {
      setAdmin(data.admin);
    } else {
      setError(data.message || "Unable to load profile.");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Admin Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Admin Profile</h1>

        <div style={styles.error}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Profile</h1>

      <div style={styles.card}>
        <div style={styles.avatar}>👤</div>

        <h2 style={styles.name}>
          {admin?.username || "Admin"}
        </h2>

        <p style={styles.role}>Administrator</p>

        <div style={styles.divider} />

        <div style={styles.infoRow}>
          <span style={styles.label}>Username</span>
          <span style={styles.value}>
            {admin?.username || "—"}
          </span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Account Type</span>
          <span style={styles.value}>
            Administrator
          </span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Account ID</span>
          <span style={styles.value}>
            {admin?._id || "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    width: "100%",
    boxSizing: "border-box",
  },

  title: {
    margin: "0 0 25px",
    fontSize: "28px",
  },

  card: {
    maxWidth: "600px",
    background: "#fff",
    borderRadius: "14px",
    padding: "35px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  avatar: {
    width: "80px",
    height: "80px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background: "#f3e8dc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
  },

  name: {
    margin: "5px 0",
    fontSize: "24px",
  },

  role: {
    margin: 0,
    color: "#777",
  },

  divider: {
    height: "1px",
    background: "#eee",
    margin: "25px 0",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },

  label: {
    color: "#777",
    fontWeight: "600",
  },

  value: {
    color: "#222",
    fontWeight: "600",
    textAlign: "right",
    wordBreak: "break-word",
  },

  error: {
    maxWidth: "600px",
    padding: "15px",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#991b1b",
  },
};

export default Profile;