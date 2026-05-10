const express = require("express");
const { getAllCourses, getSingleCourse, getSearchData, getFilterCourse } = require("../controllers/getAllCourses");
const { createCourse } = require("../controllers/createCourse");
const { updateCourse } = require("../controllers/updateCourse");
const { deleteCouse } = require("../controllers/courseDelete");
const courseRouter = express.Router();

courseRouter.get("/courses", getAllCourses);
courseRouter.get("/course/:id",getSingleCourse);
courseRouter.get("/courses/search", getSearchData);
courseRouter.get("/courses/filter", getFilterCourse);
courseRouter.post("/create-course", createCourse);
courseRouter.patch("/update-course/:id", updateCourse);
courseRouter.delete("/delete-course/:id", deleteCouse);



module.exports = {courseRouter}