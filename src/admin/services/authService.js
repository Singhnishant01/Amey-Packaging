import { API } from "../../config/api";

export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(API.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error);

    return {
      success: false,
      message: "Unable to connect to server.",
    };
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getAdmin = () => {
  const admin = localStorage.getItem("admin");
  return admin ? JSON.parse(admin) : null;
};

export const isLoggedIn = () => {
  return !!getToken();
};