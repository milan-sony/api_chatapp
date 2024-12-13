const express = require('express')
const { signup, login, logout, updateProfile, checkAuth } = require('../controllers/authControllers')
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

// to check whether user authenticated or not (after refresh / made any change)
router.get("/check", verifyToken, checkAuth)

module.exports = router