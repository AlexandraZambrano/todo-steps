import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password } = req.body
    
    try {

        const existingEmail = await User.findOne({ email: email })

        if(existingEmail){
            return res.status(400).json({ message: "The email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        const user = new User({
            username: username,
            email: email,
            password: hashPassword
        })

        await user.save()

        res.status(200).json({message: "User has been created successfully", user})
    } catch (error) {
        res.status(500).json({message: "Something must've gone wrong!"})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(400).json({ message: "Incorrect email" })
        }else{
            const validPassword = await bcrypt.compare(password, user.password)


            if(!validPassword){
                return res.status(400).json({ message: "Invalid Password" })
            }
        }

        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, '12345678910')
        await res.header({
            "auth-token": token
        })

        res.json({ token })
    } catch (error) {
        res.status(500).json({message: "Something must've gone wrong!"})
    }
}