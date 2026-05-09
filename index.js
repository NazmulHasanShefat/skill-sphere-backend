const express = require("express");
const dotenv = require("dotenv");
const dns = require("node:dns");
const app = require("./app.js");
const { connectdb } = require("./db/dbConnection.js");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const port = process.env.port || 5000;



connectdb()
  .then(() => {
    console.log("✅ db connected successfully")
    app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB connection failed", err);
    process.exit(1); // DB connect না হলে server বন্ধ করো
  });
