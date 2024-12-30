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

// returns socket id when we pass the user id
const getReceiverSocketId = (userId) =>{
    return userSocketMap[userId]
}

// used to store online users
const userSocketMap = {} // { userId: socketId }

// make connection with user from server side
io.on("connection", (socket) => {
    console.log("A user has connected", socket.id)

    const userId = socket.handshake.query.userId //gets the user id
    if (userId) {
        userSocketMap[userId] = socket.id
    }

    // io.emmit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    /// when server disconnects from user
    socket.on("disconnect", () => {
        console.log("A user has disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

module.exports = { app, httpServer, io, getReceiverSocketId };