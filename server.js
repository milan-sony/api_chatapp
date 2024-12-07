const express = require('express')
const app = express()

app.get("/", (req, res)=>{
    res.send("API - React Chat App")
})

app.listen((process.env.PORT || 5000), () => {
    console.log(`\nServer listening on port: ${process.env.PORT || 5000}`)
});