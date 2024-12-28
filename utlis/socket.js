const SocketIo = require("socket.io")
const http = require("http")
const express = require("express")

const app = express()
const socketServer = SocketIo.Server
const httpServer = http.createServer(app)

// socket server
const io = new socketServer(httpServer, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

// make connection with user from server side
io.on("connection", (socket) => {
    console.log("A user has connected", socket.id)

    /// when server disconnects from user
    socket.on("disconnect", () =>{
        console.log("A user disconnected", socket.id)
    })
})




module.exports = { app, httpServer, io };