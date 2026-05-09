const express = require("express");
const { getAllCourses, getSingleCourse, getSearchData, getFilterCourse } = require("../controllers/getAllCourses");
const courseRouter = express.Router();

courseRouter.get("/courses", getAllCourses);
courseRouter.get("/course/:id",getSingleCourse);
courseRouter.get("/courses/search", getSearchData);
courseRouter.get("/courses/filter", getFilterCourse);



module.exports = {courseRouter}