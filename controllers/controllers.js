const usermodel = require("../model/usermodel")
const bcrypt = require("bcryptjs")

module.exports = {
    signup: async (req, res) => {
        try {
            const { fullName, userName, password, confirmPassword, gender } = req.body

            if (password !== confirmPassword) {
                res.status(400).send({
                    status: 400,
                    message: "Passwords doesn't match"
                })
            }

            const user = await usermodel.findOne({ userName: userName })

            if (user) {
                return res.status(400).send({
                    status: 400,
                    message: "User already exits"
                })
            }

            // Hashing password
            var salt = bcrypt.genSaltSync(10);
            var hashedPassword = bcrypt.hashSync(password, salt);

            const maleAvatatUrl = `https://avatar.iran.liara.run/public/boy?username=${userName}`
            const femaleAvatarUrl = `https://avatar.iran.liara.run/public/girl?username=${userName}`

            const newUser = new usermodel({
                fullName: fullName,
                userName: userName,
                password: hashedPassword,
                gender: gender,
                profilePicture: gender === "male" ? maleAvatatUrl : femaleAvatarUrl
            })

            await newUser.save()

            return res.status(201).send({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePicture: newUser.profilePicture
            })
        } catch (err) {
            res.status(500).send({
                status: 500,
                message: "Internal server error"
            })
            console.log("Error: ", err)
        }
    },


    login: (req, res) => {
        res.send("Login")
        console.log("Login")
    }
}