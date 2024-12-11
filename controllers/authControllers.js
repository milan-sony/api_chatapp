const usermodel = require("../model/usermodel")
const bcrypt = require("bcryptjs")
const generateToken = require("../utlis/generateToken")

module.exports = {
    signup: async (req, res) => {
        try {
            const { fullName, email, password } = req.body

            if (!fullName || !email || !password) {
                return res.status(400).send({
                    status: 400,
                    message: "All fields are required"
                })
            }

            if (password.length < 6) {
                return res.status(400).send({
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
                return res.status(201).send({
                    status: 201,
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    message: "User successfully created"
                })
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Invalid user data"
                })
            }
        } catch (error) {
            console.log("Error in signup", error.message)
            return res.status(500).send({
                status: 500,
                message: "Internal server error",
            })
        }
    },


    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await usermodel.findOne({ email: email })

            if (!user) {
                return res.status(400).send({
                    status: 400,
                    message: "Invalid credentials"
                })
            }

            // Check if password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid credentials"
                })
            }

            generateToken(user._id, res)
            res.status(200).send({
                status: 200,
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture,
                message: "User logged in successfully"
            })

        } catch (error) {
            console.log("Error in login", error.message)
            return res.status(500).send({
                status: 500,
                message: "Internal server error",
            })
        }
    },

    logout: (req, res) => {
        try {
            res.cookie("jwt", "", { maxAge: 0 })
            res.status(200).send({
                status: 200,
                message: "User logged out successfully"
            })

        } catch (error) {

        }
    },

    updateProfile: async (req, res) => {
        console.log("update profile")
    }
}