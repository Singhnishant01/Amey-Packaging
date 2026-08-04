const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    try {
      // Delete old admin
      await Admin.deleteMany({});

      // Create new password
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await Admin.create({
        username: "admin",
        password: hashedPassword,
      });

      console.log("✅ Admin Created Successfully");
      console.log("Username: admin");
      console.log("Password: admin123");

      process.exit();
    } catch (err) {
      console.log(err);
      process.exit();
    }
  })
  .catch(console.error);