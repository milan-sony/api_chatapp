const express = require("express")
const router = express.Router()

// const api = require('./api')
const auth = require("./auth")

// router.use('/api/v1', api)
router.use("/auth", auth)

router.use("/", (req, res)=>{
    res.status(200).send({
        status: 200,
        message: "API worked successfully"
    })
})

// router.get("/", (req, res)=>{
//     res.send({
//         status: 200,
//         message: "API worked successfully"
//     })
// })

module.exports = router