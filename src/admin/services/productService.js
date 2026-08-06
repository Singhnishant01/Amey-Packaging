import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/products`;

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// =====================
// GET ALL PRODUCTS
// =====================
export const getProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

// =====================
// GET SINGLE PRODUCT
// =====================
export const getProduct = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// =====================
// ADD PRODUCT
// =====================
export const addProduct = async (formData) => {
  const res = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// =====================
// UPDATE PRODUCT
// =====================
export const updateProduct = async (id, formData) => {
  const res = await axios.put(`${API}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// =====================
// DELETE PRODUCT
// =====================
export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authHeader()
  );

  return res.data;
};