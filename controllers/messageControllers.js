const messagemodel = require("../model/messagemodel")
const usermodel = require("../model/userModel")

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
                message: "Internal server error"
            })
        }
    },

    getMessages: async (req, res) => {
        try {
            const { id: userToChatId } = req.parms //gets the id from the parms and saves it to userToChatId
            const senderId = req.user._id  //current user id

            const messages = await messagemodel.find({
                $or:[
                    {senderId:senderId, receiverId:userToChatId},
                    {senderId:userToChatId, receiverId:senderId}
                ]
            }) //find all the messages between the sender and the receiver or vice vesa
            res.status(200).send({
                status: 200,
                message: messages
            })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error"
            })
        }
    }
}