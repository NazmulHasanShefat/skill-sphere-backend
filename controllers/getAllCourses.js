const { getCollection } = require("../db/dbConnection.js")

const getAllCourses = async(req, res)=>{
   const usersCollection = await getCollection("user");
    const cursor = await usersCollection.find();
    const users = await cursor.toArray();
    res.send({data: users})
}
module.exports = {getAllCourses}