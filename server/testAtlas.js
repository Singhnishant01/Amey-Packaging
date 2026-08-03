const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://singhnishantkumar101_db_user:YOUR_PASSWORD@ameypackaging.ligdwtt.mongodb.net/?appName=AmeyPackaging";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();