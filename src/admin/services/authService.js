const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// ================= LOGIN =================

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

// ================= LOGOUT =================

export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};

// ================= TOKEN =================

export const getToken = () => {
  return localStorage.getItem("token");
};

// ================= ADMIN =================

export const getAdmin = () => {
  const admin = localStorage.getItem("admin");

  return admin ? JSON.parse(admin) : null;
};

// ================= LOGIN STATUS =================

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

// ================= GET PROFILE =================

export const getProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to server.",
    };
  }
};

// ================= CHANGE USERNAME =================

export const changeUsername = async (username) => {
  try {
    const response = await fetch(`${API_URL}/change-username`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        username,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to server.",
    };
  }
};

// ================= CHANGE PASSWORD =================

export const changePassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await fetch(`${API_URL}/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to server.",
    };
  }
};