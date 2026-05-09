const { MongoClient, ServerApiVersion } = require("mongodb");
let db = null;
const connectdb = async () => {
  if (db) return db;
  const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  await client.db("admin").command({ ping: 1 });
  db = client.db("skill-sphere");
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return db;
};

/**
 * @returns {import('mongodb').Collection}  //for suggestion
 */

const getCollection = async(collectionName)=>{
    const databse = await connectdb();
    return databse.collection(collectionName)
}

module.exports = { connectdb, getCollection };
