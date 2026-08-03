require("dotenv").config();
const { MongoClient } = require("mongodb");

async function test() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    console.log("✅ Connected successfully!");

    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  }
}

test();