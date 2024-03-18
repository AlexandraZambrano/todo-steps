import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: { type: String, require:true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user", enum: ["user", "admin"] }
})

export const User = mongoose.model("users", userSchema)