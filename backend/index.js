
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cv', uploadRoute);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch((err) => {
    console.log(err);
    process.exit(1);
});
