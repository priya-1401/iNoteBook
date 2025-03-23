require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // Load from .env

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB is connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectToMongo;
