const express = require('express')
const app = express()

// .env
require("dotenv").config()

// Base URL (/)
const routes = require("./routes")
app.use("/", routes);

app.listen((process.env.PORT || 5000), () => {
    console.log(`\nServer listening on port: ${process.env.PORT || 5000}`)
});