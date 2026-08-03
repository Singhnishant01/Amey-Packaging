const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// GET All Products (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET Single Product (Public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// ADD Product
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        name,
        category,
        description,
        features,
        applications,
      } = req.body;

      const image = req.file
        ? `/uploads/${req.file.filename}`
        : "";

      const product = await Product.create({
        name,
        category,
        image,
        description,
        features: JSON.parse(features),
        applications: JSON.parse(applications),
      });

      res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        product,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// UPDATE Product
router.put(
  "/:id",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      if (req.body.features) {
        updateData.features = JSON.parse(req.body.features);
      }

      if (req.body.applications) {
        updateData.applications = JSON.parse(
          req.body.applications
        );
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product Not Found",
        });
      }

      res.json({
        success: true,
        message: "Product Updated Successfully",
        product,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

// DELETE Product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.json({
      success: true,
      message: "Product Deleted Successfully",
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