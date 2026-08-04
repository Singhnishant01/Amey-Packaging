const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Admin = require("../models/Admin");
const { login } = require("../controllers/authController");

// =========================
// TEMP: Create Admin
// =========================
router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      return res.json({
        success: true,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Admin created successfully",
      username: "admin",
      password: "admin123",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// =========================
// Login
// =========================
router.post("/login", login);

module.exports = router;