// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractTextFromFile } = require('../services/fileParser');
const { extractCVData } = require('../services/cvExtractor');
const { validateProfile } = require('../services/schemaValidator');
const UserProfile = require('../models/UserProfile');

const mongoose = require('mongoose');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only PDF and DOCX files are allowed'));
  }
});

router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const rawText = await extractTextFromFile(req.file.buffer, req.file.mimetype);
    const extractedData = await extractCVData(rawText);
    const { valid, errors, profile } = validateProfile(extractedData);

    if (!valid) {
      return res.status(422).json({ message: 'Extraction issues', errors, profile });
    }

    const userId = req.headers['x-user-id'] || 'anonymous';

    let profileId = null;
    if (mongoose.connection.readyState === 1) try {
      const userProfile = await UserProfile.findOneAndUpdate(
        { userId },
        {
          userId,
          cvRawText: rawText,
          cvFileName: req.file.originalname,
          cvMimeType: req.file.mimetype,
          extractedData: profile,
          status: 'complete',
          extractionErrors: errors,
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );
      profileId = userProfile._id;
    } catch (dbErr) {
      console.warn('MongoDB save failed (non-fatal):', dbErr.message);
    }

    res.json({ success: true, profile, profileId });

  } catch (err) {
    console.error('Extraction error:', err);
    res.status(500).json({ message: 'CV extraction failed', error: err.message });
  }
});

module.exports = router;