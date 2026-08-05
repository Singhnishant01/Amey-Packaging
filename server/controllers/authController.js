const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET || "amey_secret_key",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login Successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= PROFILE =================

const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    res.json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= CHANGE USERNAME =================

const changeUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const existing = await Admin.findOne({
      username,
      _id: { $ne: req.admin.id },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      {
        username,
      },
      {
        new: true,
      }
    ).select("-password");

    res.json({
      success: true,
      message: "Username Updated Successfully",
      admin,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const admin = await Admin.findById(req.admin.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();

    res.json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  login,
  getProfile,
  changeUsername,
  changePassword,
};