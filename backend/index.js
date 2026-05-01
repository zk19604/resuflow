
// require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
// const express = require('express');
// const cors = require('cors');
// const uploadRoute = require('./routes/upload');
// const deployRoute = require('./routes/deploy');
// const connectDB = require('./config/db');

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/cv', uploadRoute);
// app.use('/api/', deployRoute);

// const PORT = 3003 ;

// async function start() {
//     try {
//         await connectDB();
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.log('MongoDB not available - starting without DB');
//     }
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// process.on('unhandledRejection', (err) => {
//     console.log('Unhandled Rejection:', err.message);
// });

// process.on('uncaughtException', (err) => {
//     console.log('Uncaught Exception:', err.message);
// });

// start();


require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 
const uploadRoute = require('./routes/upload');
const deployRoute = require('./routes/deploy');
const authRoute   = require('./routes/auth');      // ← NEW
 
const app = express();
 
// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));
 
app.use(express.json());
 
// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoute);   // ← NEW  (signup / login / me)
app.use('/api/cv',   uploadRoute);
app.use('/api/',     deployRoute);
 
// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok' }));
 
// ── DB + Start ────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3003;
 
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI not configured — running without DB');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection failed:', err.message);
  }
};
 
async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
 
process.on('unhandledRejection', (err) => console.log('Unhandled Rejection:', err.message));
process.on('uncaughtException',  (err) => console.log('Uncaught Exception:',  err.message));
 
start();
 