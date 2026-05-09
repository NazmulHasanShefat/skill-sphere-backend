const express = require("express");
const cors = require("cors");
const { courseRouter } = require("./routes/courseRoutes.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", courseRouter)
app.get("/", (req, res)=>{
    res.send({status: "server is running"});
})

module.exports = app;