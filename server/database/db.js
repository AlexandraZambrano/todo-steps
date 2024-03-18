import mongoose from "mongoose"

export const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todoProject")
        console.log("connected to database")
    } catch (error) {
        console.log(error, "something went wrong")
    }

}