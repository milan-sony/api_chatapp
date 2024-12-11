const jwt = require("jsonwebtoken")

const generateToken = (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // prevent XSS
        sameSite: "strict", // prevent CSRF
        secure: process.env.NODE_ENV !== "development" // check http/https
    })

    return token
}

module.exports = generateToken