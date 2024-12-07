const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send(200).json(
        {
            status: 200,
            message: 'API working properly'
        }
    )
})

module.exports = router