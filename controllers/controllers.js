module.exports = {
    signup: async (req, res) => {
        try {
            const {fullName, userName, password, confirmpassword, gender} = req.body

        } catch(err) {
            console.log("Error: ", err)
        }
    },
    login: (req, res) => {
        res.send("Login")
        console.log("Login")
    }
}