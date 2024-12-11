const usermodel = require("../model/usermodel")
const bcrypt = require("bcryptjs")
const generateToken = require("../utlis/generateToken")

module.exports = {
    signup: async (req, res) => {
        try {
            const { fullName, email, password } = req.body

            if (!fullName || !email || !password) {
                res.status(400).send({
                    status: 400,
                    message: "All fields are required"
                })
            }

            if (password.length < 6) {
                res.status(400).send({
                    status: 400,
                    message: "Password must be at least 6 character"
                })
            }

            const user = await usermodel.findOne({ email: email })

            if (user) {
                return res.status(400).send({
                    status: 400,
                    message: "User already exits"
                })
            }

            // Hashing password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newUser = new usermodel({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            })

            if (newUser) {
                // Generate JWT token
                generateToken(newUser._id, res)
                await newUser.save()
                res.status(201).send({
                    status: 201,
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    message: "User successfully created"
                })
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Invalid user data"
                })
            }
        } catch (err) {
            res.status(500).send({
                status: 500,
                message: "Internal server error",
            })
            console.log("Error: ", err)
        }
    },


    login: (req, res) => {
        res.send("Login")
        console.log("Login")
    }
}