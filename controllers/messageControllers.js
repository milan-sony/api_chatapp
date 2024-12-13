const usermodel = require("../model/userModel")

module.exports = {
    getUsersForSidebar: async (req, res) => {
        try {
            const loggedUserId = req.user._id // user id is getting from the verifyToken
            const filteredUsers = await usermodel.find({_id: {$ne: loggedUserId}}).select("-password -__v") //getting all the user data (excluding password),except the current user (`$ne` - not equal to)

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
    }
}