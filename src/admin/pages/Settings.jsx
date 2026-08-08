import { useEffect, useState } from "react";

import {
  getProfile,
  changeUsername,
  changePassword,
} from "../services/authService";

function Settings() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();

    if (data.success) {
      setUsername(data.admin.username);
      setNewUsername(data.admin.username);
    } else {
      setError(data.message || "Unable to load admin profile.");
    }

    setLoading(false);
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!newUsername.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    const data = await changeUsername(newUsername.trim());

    if (data.success) {
      setUsername(data.admin.username);
      setNewUsername(data.admin.username);

      const storedAdmin = JSON.parse(
        localStorage.getItem("admin") || "{}"
      );

      localStorage.setItem(
        "admin",
        JSON.stringify({
          ...storedAdmin,
          username: data.admin.username,
        })
      );

      setMessage("Username updated successfully.");
    } else {
      setError(data.message || "Unable to update username.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const data = await changePassword(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (data.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage("Password updated successfully.");
    } else {
      setError(data.message || "Unable to update password.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h1>Settings</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Admin Settings
      </h1>

      {message && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            background: "#dcfce7",
            color: "#166534",
            borderRadius: "8px",
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {/* Username */}

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Change Username</h2>

        <p
          style={{
            color: "#666",
            marginBottom: "20px",
          }}
        >
          Current username: <strong>{username}</strong>
        </p>

        <form onSubmit={handleUsernameChange}>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#9a5318",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Update Username
          </button>
        </form>
      </div>

      {/* Password */}

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Change Password</h2>

        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#9a5318",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;