const cloudinary = require("cloudinary").v2; // Use `v2` to access Cloudinary methods
const { config } = require("dotenv");

config(); // Load environment variables from .env file

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;