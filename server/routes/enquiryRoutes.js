const express = require("express");
const router = express.Router();

const Enquiry = require("../models/Enquiry");
const protect = require("../middleware/authMiddleware");

// ==========================
// Add Enquiry (Public)
// ==========================
router.post("/", async (req, res) => {
  console.log("POST /api/enquiries reached");
  console.log(req.body);

  try {
    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry Sent Successfully",
      enquiry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
// ==========================
// Get All Enquiries (Admin)
// ==========================
router.get("/", protect, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    });

    res.json(enquiries);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================
// Mark As Read
// ==========================
router.put("/:id", protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: "Read" },
      { new: true }
    );

    res.json(enquiry);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ==========================
// Delete Enquiry
// ==========================
router.delete("/:id", protect, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;