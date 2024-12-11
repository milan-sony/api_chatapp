const usermodel = require("../model/usermodel")
const bcrypt = require("bcryptjs")

module.exports = {
    signup: async (req, res) => {
        try {
            const { fullName, email, password, confirmPassword, gender } = req.body

            if (password !== confirmPassword) {
                res.status(400).send({
                    status: 400,
                    message: "Passwords doesn't match"
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
            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(password, salt);

            const maleAvatatUrl = `https://avatar.iran.liara.run/public/boy?username=${fullName}`
            const femaleAvatarUrl = `https://avatar.iran.liara.run/public/girl?username=${fullName}`

            const newUser = new usermodel({
                fullName: fullName,
                email: email,
                password: hashedPassword,
                gender: gender,
                profilePicture: gender === "male" ? maleAvatatUrl : femaleAvatarUrl
            })

            if (newUser) {
                await newUser.save()
                res.status(201).send({
                    status: 201,
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    message: "User successfully created"
                })
            }else{
                res.status(400).send({
                    status: 400,
                    message: "Invalid user data"
                })
            }
        } catch (err) {
            res.status(500).send({
                status: 500,
                message: "Internal server error",
                error: "Error: "`${err}`
            })
            console.log("Error: ", err)
        }
    },


    login: (req, res) => {
        res.send("Login")
        console.log("Login")
    }
}