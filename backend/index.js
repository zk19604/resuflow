
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const deployRoute = require('./routes/deploy');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cv', uploadRoute);
app.use('/api/', deployRoute);

const PORT = 3003 ;

async function start() {
    try {
        await connectDB();
        console.log('MongoDB connected');
    } catch (err) {
        console.log('MongoDB not available - starting without DB');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection:', err.message);
});

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err.message);
});

start();
