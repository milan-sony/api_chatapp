const express = require('express')
const router = express.Router()

// user signup
router.get("/signup", (req, res) => {
    res.send({
        status: 200,
        message: "signup"
    })
})

// user login
router.get("/login", (req, res) => {
    res.send({
        status: 200,
        message: "login"
    })
})

module.exports = router