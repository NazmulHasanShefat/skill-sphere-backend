const express = require("express");
const { getAllCourses } = require("../controllers/getAllCourses");
const courseRouter = express.Router();

courseRouter.get("/courses", getAllCourses);


module.exports = {courseRouter}