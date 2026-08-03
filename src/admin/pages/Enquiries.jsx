import { useEffect, useState } from "react";
import {
  getEnquiries,
  deleteEnquiry,
  markAsRead,
} from "../services/enquiryService";

import "../styles/Enquiries.css";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    try {
      await deleteEnquiry(id);
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      fetchEnquiries();

      if (selectedEnquiry) {
        setSelectedEnquiry({
          ...selectedEnquiry,
          status: "Read",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="enquiries-page">

      <h2>Customer Enquiries</h2>

      <table className="enquiry-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {enquiries.length === 0 ? (

            <tr>
              <td colSpan="6">
                No Enquiries Found
              </td>
            </tr>

          ) : (

            enquiries.map((enquiry) => (

              <tr key={enquiry._id}>

                <td>{enquiry.name}</td>

                <td>{enquiry.email}</td>

                <td>{enquiry.phone}</td>

                <td>
                  {enquiry.status === "New" ? (
                    <span className="new-status">
                      🟢 New
                    </span>
                  ) : (
                    <span className="read-status">
                      ⚪ Read
                    </span>
                  )}
                </td>

                <td>
                  {new Date(
                    enquiry.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedEnquiry(enquiry)
                    }
                  >
                    View
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(enquiry._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      {/* Modal */}

      {selectedEnquiry && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h2>Enquiry Details</h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedEnquiry.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedEnquiry.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedEnquiry.phone}
            </p>

            <p>
              <strong>Subject:</strong>{" "}
              {selectedEnquiry.subject || "-"}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div className="message-box">
              {selectedEnquiry.message}
            </div>

            <p>
              <strong>Status:</strong>{" "}
              {selectedEnquiry.status}
            </p>

            <div className="modal-buttons">

              {selectedEnquiry.status === "New" && (
                <button
                  className="read-btn"
                  onClick={() =>
                    handleRead(selectedEnquiry._id)
                  }
                >
                  Mark as Read
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(selectedEnquiry._id)
                }
              >
                Delete
              </button>

              <button
                className="close-btn"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Enquiries;