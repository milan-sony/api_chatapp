const express = require('express')
const verifyToken = require('../../middleware/verifyToken')
const { getUsersForSidebar } = require('../../controllers/messageControllers')
const router = express.Router()

router.get("/users", verifyToken, getUsersForSidebar)

module.exports = router