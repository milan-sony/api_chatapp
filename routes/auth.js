const express = require('express')
const { signup, login, logout, updateProfile } = require('../controllers/authControllers')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

// user signup
router.post("/signup", signup)

// user login
router.post("/login", login)

// user logout
router.post("/logout", logout)

// update profile pic
router.put("/update_profile", verifyToken, updateProfile)

module.exports = router