require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    const products = [
      {
        name: "Non Woven Bags",
        category: "Shopping Bags",
        image: "/products/premium-non-woven-coat-cover.jpg",
        description: "Eco-friendly reusable non woven shopping bags.",
        features: ["Reusable", "Durable", "Eco Friendly"],
        applications: ["Retail", "Shopping", "Promotional"],
      },
      {
        name: "D-Cut Bags",
        category: "Shopping Bags",
        image: "/products/mafsa+non-woven-coat-cover.jpg",
        description: "Premium D-cut carry bags.",
        features: ["Strong", "Lightweight"],
        applications: ["Retail", "Grocery"],
      },
      {
        name: "Loop Handle Bags",
        category: "Shopping Bags",
        image: "/products/loop-handle-bag.jpg",
        description: "Premium loop handle shopping bags.",
        features: ["Premium Finish", "Reusable"],
        applications: ["Fashion", "Garments", "Retail"],
      },
      {
        name: "Box Bags",
        category: "Packaging",
        image: "/products/premium-heavy-coat-cover.jpg",
        description: "Premium box style packaging bags.",
        features: ["Large Capacity", "Strong Material"],
        applications: ["Packaging", "Retail"],
      },
      {
        name: "BOPP Laminated Bags",
        category: "Packaging",
        image: "/products/bopp-laminated-bag.jpg",
        description: "High-quality BOPP laminated bags.",
        features: ["Water Resistant", "Premium Print"],
        applications: ["Food", "Retail", "Packaging"],
      },
      {
        name: "Garment Covers",
        category: "Garments",
        image: "/products/embossed-fabric-coat-cover.jpg",
        description: "Premium garment covers for clothing protection.",
        features: ["Dust Protection", "Reusable"],
        applications: ["Garments", "Clothing Stores"],
      },
      {
        name: "Courier Bags",
        category: "Courier",
        image: "/products/parasuit-material-coat-cover.jpg",
        description: "Durable courier packaging bags.",
        features: ["Tamper Proof", "Strong Material"],
        applications: ["E-commerce", "Courier Services"],
      },
      {
        name: "Zip Lock Pouches",
        category: "Pouches",
        image: "/products/transparent-sherwani-cover.jpg",
        description: "Reusable zip lock storage pouches.",
        features: ["Leak Proof", "Reusable"],
        applications: ["Food", "Storage"],
      },
      {
        name: "Customized Packaging",
        category: "Custom",
        image: "/products/premium-non-woven-coat-cover.jpg",
        description: "Customized packaging solutions with branding.",
        features: ["Custom Branding", "Premium Quality"],
        applications: ["Businesses", "Retail", "Promotions"],
      },
    ];

    await Product.deleteMany();
    console.log("🗑️ Old products deleted");

    await Product.insertMany(products);
    console.log("✅ Products inserted successfully");

    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });