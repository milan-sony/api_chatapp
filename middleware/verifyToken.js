const jwt = require("jsonwebtoken")

const userModel = require("../model/userModel")

const verifyToken = async (req, res, next) => {
    try {

        const token = req.cookies.jwt //parse cookie
        if (!token) {
            return res.status(401).send({
                status: 401,
                message: "Unauthorized - No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).send({
                status: 401,
                message: "Unauthorized - Invalid token"
            })
        }

        const user = await userModel.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).send({
                status: 404,
                message: "User not found"
            })
        }

        req.user = user // add a user field with the value of the user from the database to the request
        next() // calling next function
    } catch (error) {
        console.log("Error:", error.message)
        return res.status(500).send({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports = verifyToken