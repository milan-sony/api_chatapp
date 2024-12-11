const express = require('express')
const { signup, login } = require('../controllers/authControllers')

const router = express.Router()

// user signup
router.post("/signup", signup)

// user login
router.post('/login', login)

module.exports = router