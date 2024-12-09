const express = require('express')
const app = express()

// .env
require("dotenv").config()

// DB
const db = require('./config/db');
db.connect();

// body parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Base URL (/)
const routes = require("./routes")
app.use("/", routes);

app.listen((process.env.PORT || 5000), () => {
    console.log(`\nServer listening on port: ${process.env.PORT || 5000}`)
});