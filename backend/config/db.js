const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.log('MongoDB URI not configured - running without DB');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000, bufferCommands: false });
        console.log('MongoDB connected');
    } catch (err) {
        console.log('MongoDB connection failed:', err.message);
    }
};

module.exports = connectDB;
