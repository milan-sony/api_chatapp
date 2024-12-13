const express = require('express')
const verifyToken = require('../../middleware/verifyToken')
const { getUsersForSidebar, getMessages } = require('../../controllers/messageControllers')
const router = express.Router()

router.get("/users", verifyToken, getUsersForSidebar) //get all the users (except the current user) to display on the sidebar
router.get("/:id", verifyToken, getMessages) //get all the message with a particular user

module.exports = router