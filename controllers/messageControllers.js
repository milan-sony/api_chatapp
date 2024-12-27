const messagemodel = require("../model/messagemodel")
const usermodel = require("../model/userModel")
const { cloudinary } = require("../utlis/cloudinary")

module.exports = {
    getUsersForSidebar: async (req, res) => {
        try {
            const loggedUserId = req.user._id // user id is getting from the verifyToken
            const filteredUsers = await usermodel.find({ _id: { $ne: loggedUserId } }).select("-password -__v") //getting all the user data (excluding password),except the current user (`$ne` - not equal to)

            console.log("Filtered users: ", filteredUsers)

            res.status(200).send({
                status: 200,
                message: filteredUsers
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error",
                error: error
            })
        }
    },

    getMessages: async (req, res) => {
        try {
            const { id: userToChatId } = req.params //gets the id from the params and saves it to id (id : renamed to userToChatId)
            const senderId = req.user._id  //current user id

            const messages = await messagemodel.find({
                $or: [
                    { senderId: senderId, receiverId: userToChatId },
                    { senderId: userToChatId, receiverId: senderId }
                ]
            }) //find all the messages between the sender and the receiver or vice vesa
            res.status(200).send({
                status: 200,
                message: messages
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error",
                error: error
            })
        }
    },

    sendMessage: async (req, res) => {
        try {
            const { text, image } = req.body
            const senderId = req.user._id
            const { id: receiverId } = req.params

            let imageUrl;
            if (image) {
                // upload base64 image to cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image)
                imageUrl = uploadResponse.secure_url
            }

            const newmessage = new messagemodel({
                senderId: senderId,
                receiverId: receiverId,
                text: text,
                image: imageUrl
            })

            if (newmessage) {
                await newmessage.save()
                return res.status(201).send({
                    status: 201,
                    _id: newmessage._id,
                    senderId: newmessage.senderId,
                    receiverId: newmessage.receiverId,
                    text: newmessage.text,
                    image: newmessage.image,
                    message: "Message sent successfully"
                })
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Message not sent"
                })
            }

        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error",
                error: error
            })
        }
    }
}