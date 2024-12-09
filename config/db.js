const mongoose = require('mongoose');
require("dotenv").config();

module.exports = {

    connect: () => {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                console.log("\nConnected to MongoDB Atlas\n");
            }).catch((error) => {
                console.log("\nError connecting to MongoDB Atlas\n", error);
            });
    },

    collection: (name) => {
        return mongoose.connection.db.collection(name);
    }

};