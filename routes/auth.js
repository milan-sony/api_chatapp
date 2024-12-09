const express = require('express')
const { signup, login } = require('../controllers/controllers')
const router = express.Router()

// user signup
router.get("/signup", signup)

// user login
router.get('/login', login)

module.exports = router