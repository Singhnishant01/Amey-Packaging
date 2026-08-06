import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/enquiries`;

const getToken = () => localStorage.getItem("token");

// =========================
// USER - SEND ENQUIRY
// =========================
export const sendEnquiry = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// =========================
// ADMIN - GET ENQUIRIES
// =========================
export const getEnquiries = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

// =========================
// MARK AS READ
// =========================
export const markAsRead = async (id) => {
  const res = await axios.put(
    `${API}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};

// =========================
// DELETE ENQUIRY
// =========================
export const deleteEnquiry = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};