const BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const API = {
  BASE_URL,

  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    PROFILE: `${API_URL}/auth/profile`,
    CHANGE_PASSWORD: `${API_URL}/auth/change-password`,
    CHANGE_USERNAME: `${API_URL}/auth/change-username`,
  },

  PRODUCT: {
    GET_ALL: `${API_URL}/products`,
    ADD: `${API_URL}/products`,
    UPDATE: (id) => `${API_URL}/products/${id}`,
    DELETE: (id) => `${API_URL}/products/${id}`,
  },

  ENQUIRY: {
    GET_ALL: `${API_URL}/enquiries`,
    DELETE: (id) => `${API_URL}/enquiries/${id}`,
  },
};