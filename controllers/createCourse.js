const { getCollection } = require("../db/dbConnection");

const createCourse = async(req, res)=>{
    try {
        const newCourse = req.body;
        const userCollection = await getCollection("courses");
        const result = await userCollection.insertOne(newCourse);
        res.json(result);
    } catch (error) {
        console.log("faild to create course from server")
    }
}
module.exports = {createCourse};