const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginAdmin = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
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
    console.error(error);

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
  return !!localStorage.getItem("token");
};