const { ObjectId } = require("mongodb");
const { getCollection } = require("../db/dbConnection");

const deleteCouse = async(req, res)=>{
    const UpdatedCourse = req.body;
    const {id} = req.params;
    try {
        const userCollection = await getCollection("courses")
        const result = await userCollection.deleteOne({_id: new ObjectId(id)});
        res.json(result)
    } catch (error) {
        console.log("faild to update course from server")
    }
}
module.exports = {deleteCouse}