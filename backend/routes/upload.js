// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractTextFromFile } = require('../services/fileParser');
const { extractCVData } = require('../services/cvExtractor');
const { validateProfile } = require('../services/schemaValidator');
const UserProfile = require('../models/UserProfile');

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
    // 1. Extract raw text
    const rawText = await extractTextFromFile(req.file.buffer, req.file.mimetype);
    // 2. Send to Gemini
    const extractedData = await extractCVData(rawText);

    // 3. Validate & normalize
    const { valid, errors, profile } = validateProfile(extractedData);

    if (!valid) {
      return res.status(422).json({ message: 'Extraction issues', errors, profile });
    }

    // 4. Save to MongoDB (your existing User model)
    const userProfile = await UserProfile.create({
      userId: req.headers['x-user-id'] || 'anonymous',
      cvRawText: rawText,
      cvFileName: req.file.originalname,
      cvMimeType: req.file.mimetype,
      extractedData: profile,
      status: valid ? 'complete' : 'draft',
      extractionErrors: errors,
    });

    res.json({ success: true, profile, profileId: userProfile._id });

  } catch (err) {
    console.error('Extraction error:', err);
    res.status(500).json({ message: 'CV extraction failed', error: err.message });
  }
});

module.exports = router;