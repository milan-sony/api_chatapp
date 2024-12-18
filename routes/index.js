const express = require("express")
const router = express.Router()

const api = require("./api")
router.use("/api/v1", api)

router.use("/api", (req, res)=>{
    res.status(200).send({
        status: 200,
        message: "Chat API is working properly"
    })
})

module.exports = router