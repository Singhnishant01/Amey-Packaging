import { useEffect, useState } from "react";

import { getToken } from "../services/authService";

const API_URL = `${import.meta.env.VITE_API_URL}/enquiries`;

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load enquiries.");
      }

      setEnquiries(data);
    } catch (error) {
      console.error(error);
      setError(error.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark enquiry as read.");
      }

      setEnquiries((previous) =>
        previous.map((enquiry) =>
          enquiry._id === id
            ? { ...enquiry, status: "Read" }
            : enquiry
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to update enquiry.");
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete enquiry.");
      }

      setEnquiries((previous) =>
        previous.filter((enquiry) => enquiry._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to delete enquiry.");
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Enquiries</h1>
        <p>Loading enquiries...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Enquiries</h1>
          <p style={styles.subtitle}>
            Manage enquiries received from customers.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchEnquiries}
          style={styles.refreshButton}
        >
          Refresh
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {!error && enquiries.length === 0 && (
        <div style={styles.empty}>
          <h3>No enquiries yet</h3>
          <p>Customer enquiries will appear here.</p>
        </div>
      )}

      {enquiries.length > 0 && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id}>
                  <td style={styles.td}>{enquiry.name}</td>

                  <td style={styles.td}>
                    <a
                      href={`mailto:${enquiry.email}`}
                      style={styles.emailLink}
                    >
                      {enquiry.email}
                    </a>
                  </td>

                  <td style={styles.td}>
                    <a
                      href={`tel:${enquiry.phone}`}
                      style={styles.phoneLink}
                    >
                      {enquiry.phone}
                    </a>
                  </td>

                  <td style={styles.td}>
                    {enquiry.subject || "—"}
                  </td>

                  <td
                    style={{
                      ...styles.td,
                      ...styles.messageCell,
                    }}
                  >
                    {enquiry.message}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={
                        enquiry.status === "New"
                          ? styles.newStatus
                          : styles.readStatus
                      }
                    >
                      {enquiry.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {enquiry.createdAt
                      ? new Date(enquiry.createdAt).toLocaleString()
                      : "—"}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actions}>
                      {enquiry.status === "New" && (
                        <button
                          type="button"
                          onClick={() => markAsRead(enquiry._id)}
                          style={styles.readButton}
                        >
                          Mark Read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => deleteEnquiry(enquiry._id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    width: "100%",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
  },

  subtitle: {
    marginTop: "8px",
    color: "#666",
  },

  refreshButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#9a5318",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  error: {
    padding: "15px",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#991b1b",
    marginBottom: "20px",
  },

  empty: {
    padding: "40px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    minWidth: "1100px",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    borderBottom: "1px solid #ddd",
    background: "#f8f8f8",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
  },

  messageCell: {
    maxWidth: "300px",
    lineHeight: "1.5",
  },

  emailLink: {
    color: "#2563eb",
    textDecoration: "none",
  },

  phoneLink: {
    color: "#2563eb",
    textDecoration: "none",
  },

  newStatus: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "20px",
    background: "#fef3c7",
    color: "#92400e",
    fontSize: "13px",
    fontWeight: "600",
  },

  readStatus: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "20px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: "13px",
    fontWeight: "600",
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  readButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  deleteButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default Enquiries;