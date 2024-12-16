const express = require('express')
const app = express()


// .env
require("dotenv").config()

// DB
const db = require('./config/db');
db.connect();

// body parser
app.use(express.json())

// cors
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// cookie parser
const cookieParser = require("cookie-parser")
app.use(cookieParser())

// Base URL (/)
const routes = require("./routes")
app.use("/", routes);

app.listen((process.env.PORT || 5000), () => {
    console.log(`\nServer listening on port: ${process.env.PORT || 5000}`)
});