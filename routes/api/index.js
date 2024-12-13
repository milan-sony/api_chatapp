const express = require("express")
const router = express.Router()

const userRoutes = require("./userRoutes")
const messageRoutes = require("./messageRoutes")

router.get("/", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "Chat API V1"
    })
})

router.use("/user", userRoutes)
router.use("/message", messageRoutes)

module.exports = router