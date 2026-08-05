const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  login,
  getProfile,
  changeUsername,
  changePassword,
} = require("../controllers/authController");

// ================= PUBLIC =================

// Login
router.post("/login", login);

// ================= PROTECTED =================

// Get Admin Profile
router.get("/profile", protect, getProfile);

// Change Username
router.put("/change-username", protect, changeUsername);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;