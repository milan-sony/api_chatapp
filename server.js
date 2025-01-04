const express = require('express')
const db = require('./config/db');
const cors = require("cors")
const cookieParser = require("cookie-parser")
const routes = require("./routes");
const { app, httpServer } = require('./utlis/socket');
const bodyParser = require('body-parser')

// .env
require("dotenv").config()

// DB
db.connect();


// body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //allows to send cookies and authorization headers with the request
}))

// cookie parser
app.use(cookieParser())

// Base URL (/)
app.use("/", routes);

httpServer.listen((process.env.PORT || 5000), () => {
    console.log(`\nServer listening on port: ${process.env.PORT || 5000}`)
});