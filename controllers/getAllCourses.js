const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnection.js");

const getAllCourses = async (req, res) => {
  try {
    const usersCollection = await getCollection("courses");
    const cursor = await usersCollection.find();
    const users = await cursor.toArray();
    if (users.length === 0) {
      res.json({ success: false, message: "course not found" });
    } else {
      res.json({ data: users });
    }
  } catch (error) {
    res.json({ success: false, message: "faild to fetch all courses" });
  }
};

const getSingleCourse = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid course id",
    });
  }
  const filter = { _id: new ObjectId(id) };
  const courseCollection = await getCollection("courses");
  const singleCollection = await courseCollection.findOne(filter);
  if (!singleCollection) {
    res.json({ name: "other" });
  } else {
    res.json({ data: singleCollection });
  }
};

const getSearchData = async (req, res) => {
  const { keyword } = req.query;

  try {
    const courseCollection = await getCollection("courses");
    if (keyword) {
      const result = await courseCollection
        .find({
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { instructor: { $regex: keyword, $options: "i" } },
            { about_instructor: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { level: { $regex: keyword, $options: "i" } },
          ],
        })
        .toArray();
      if (result.length !== 0) {
        res.json({ message: true, data: result });
      } else {
        res.json({ message: false, data: "data not found" });
      }
    } else {
      res.json({ success: false, message: "keyword not found" });
    }
  } catch (error) {
    // Log the error to see if it's coming from an ObjectId cast elsewhere
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const getFilterCourse = async (req, res) => {
  const {
    instructor,
    rating,
    duration,
    category,
    discountPrice,
    minPrice,
    maxPrice,
  } = req.query;
  const filter = {};
  const courseCollection = await getCollection("courses");
  if (instructor) {
    filter.instructor = { $regex: instructor, $options: "i" };
  }
  if (rating) {
    filter.rating = { $regex: rating, $options: "i" };
  }
  if (duration) {
    filter.duration = { $regex: duration, $options: "i" };
  }
  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }
  if (discountPrice) {
    filter.discountPrice = { $regex: discountPrice, $options: "i" };
  }
  if (maxPrice && minPrice) {
    const result = await courseCollection
      .find({
        $and: [
          { discountPrice: { $gte: Number(minPrice) } },
          { discountPrice: { $lte: Number(maxPrice) } },
        ],
      })
      .toArray();
    return res.json(result);
  }
  if (minPrice) {
    filter.discountPrice = { $gte: Number(minPrice) };
  }
  if (maxPrice) {
    filter.discountPrice = { $lte: Number(maxPrice) };
  }

  const result = await courseCollection.find(filter).toArray();
  console.log(filter);
  res.json(result);
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  getSearchData,
  getFilterCourse,
};
