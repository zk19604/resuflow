const express = require('express');
const { z } = require('zod');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
const AppError = require('../services/AppError');
const PortfolioDeployment = require('../models/PortfolioDeployment');

const router = express.Router();

const DEPLOYED_APP_URL = process.env.DEPLOYED_APP_URL || 'https://your-portfolio-app.vercel.app';

const configSchema = z.object({
  template: z.string().optional().default('glassmorphism'),
  palette: z.object({
    name: z.string(),
    colors: z.array(z.string()),
  }).optional(),
  font: z.enum(['sans', 'serif']).optional().default('sans'),
  sectionsVisible: z.record(z.boolean()).optional(),
  tone: z.string().optional().default('professional'),
}).optional();

const profileSchema = z.object({
  userId: z.string().min(1, 'userId is required').max(100),
  template: z.string().optional().default('glassmorphism'),
  config: configSchema,
  profile: z.object({
    personalInfo: z.object({
      name: z.string().optional().default(''),
      email: z.string().optional().default(''),
      phone: z.string().optional().default(''),
      location: z.string().optional().default(''),
      linkedin: z.string().optional().default(''),
      github: z.string().optional().default(''),
      website: z.string().optional().default(''),
      portfolio: z.string().optional().default(''),
      title: z.string().optional().default(''),
      summary: z.string().optional().default(''),
    }).optional().default({}),
    summary: z.string().optional().default(''),
    workExperience: z.array(z.object({
      company: z.string().optional().default(''),
      role: z.string().optional().default(''),
      startDate: z.string().optional().default(''),
      endDate: z.string().optional().default(''),
      description: z.string().optional().default(''),
      location: z.string().optional().default(''),
      achievements: z.union([z.array(z.string()), z.string()]).optional().default([]),
    })).optional().default([]),
    education: z.array(z.object({
      institution: z.string().optional().default(''),
      degree: z.string().optional().default(''),
      field: z.string().optional().default(''),
      startDate: z.string().optional().default(''),
      endDate: z.string().optional().default(''),
      grade: z.string().optional().default(''),
    })).optional().default([]),
    skills: z.object({
      technical: z.array(z.string()).optional().default([]),
      tools: z.array(z.string()).optional().default([]),
      soft: z.array(z.string()).optional().default([]),
      domain: z.array(z.string()).optional().default([]),
      languages: z.array(z.string()).optional().default([]),
    }).optional().default({}),
    certifications: z.array(z.object({
      name: z.string().optional().default(''),
      issuer: z.string().optional().default(''),
      date: z.string().optional().default(''),
    })).optional().default([]),
    projects: z.array(z.object({
      name: z.string().optional().default(''),
      description: z.string().optional().default(''),
      tools: z.array(z.string()).optional().default([]),
      link: z.string().optional().default(''),
      type: z.string().optional().default(''),
    })).optional().default([]),
    achievements: z.union([
      z.array(z.object({
        title: z.string().optional().default(''),
        description: z.string().optional().default(''),
        date: z.string().optional().default(''),
      })),
      z.array(z.string()),
    ]).optional().default([]),
    volunteering: z.array(z.object({
      organization: z.string().optional().default(''),
      role: z.string().optional().default(''),
      startDate: z.string().optional().default(''),
      endDate: z.string().optional().default(''),
      description: z.string().optional().default(''),
    })).optional().default([]),
    publications: z.array(z.object({
      title: z.string().optional().default(''),
      publisher: z.string().optional().default(''),
      date: z.string().optional().default(''),
      link: z.string().optional().default(''),
    })).optional().default([]),
    references: z.array(z.object({
      name: z.string().optional().default(''),
      role: z.string().optional().default(''),
      contact: z.string().optional().default(''),
    })).optional().default([]),
    extras: z.object({
      interests: z.array(z.string()).optional().default([]),
      memberships: z.array(z.string()).optional().default([]),
      speakingEngagements: z.array(z.string()).optional().default([]),
    }).optional().default({}),
  }).optional().default({}),
});

const userProfiles = new Map();

const rateLimitMap = new Map();

function checkRateLimit(userId) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 10;

  const key = userId;
  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

router.post('/deploy', async (req, res) => {
  try {
    const parseResult = profileSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errors = parseResult.error.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const { userId, profile, config, template } = parseResult.data;

    if (!checkRateLimit(userId)) {
      return res.status(429).json({ message: 'Rate limit exceeded: max 10 updates per hour' });
    }

    const username = userId.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const resolvedConfig = config || {};
    if (!resolvedConfig.template) resolvedConfig.template = template || 'glassmorphism';
    userProfiles.set(username, { profile, config: resolvedConfig });

    if (mongoose.connection.readyState === 1) {
      try {
        await PortfolioDeployment.findOneAndUpdate(
          { username },
          { username, profile, config: resolvedConfig },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
        );
      } catch (dbErr) {
        console.warn('MongoDB deploy save failed (non-fatal):', dbErr.message);
      }
    } else {
      console.warn('MongoDB not connected, skipping DB save for:', username);
    }

    const portfolioUrl = `${DEPLOYED_APP_URL}/${username}`;

    res.json({
      success: true,
      portfolioUrl,
      username,
      message: 'Portfolio deployed successfully',
    });

  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error('Deploy error:', error);
    res.status(500).json({ message: 'Deployment failed' });
  }
});

router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;
  const entry = userProfiles.get(username);

  if (entry) {
    return res.json({ profile: entry.profile, config: entry.config || {} });
  }

  if (mongoose.connection.readyState !== 1)
    return res.status(404).json({ message: 'Profile not found' });

  try {
    const doc = await PortfolioDeployment.findOne({ username }).lean();
    if (!doc) return res.status(404).json({ message: 'Profile not found' });
    return res.json({ profile: doc.profile, config: doc.config || {} });
  } catch {
    return res.status(404).json({ message: 'Profile not found' });
  }
});

router.get('/status/:userId', async (req, res) => {
  const { userId } = req.params;
  const username = userId.toLowerCase().replace(/[^a-z0-9]/g, '-');

  if (userProfiles.has(username)) {
    return res.json({ deployed: true, portfolioUrl: `${DEPLOYED_APP_URL}/${username}`, username });
  }

  if (mongoose.connection.readyState !== 1)
    return res.status(404).json({ message: 'Profile not found' });

  try {
    const doc = await PortfolioDeployment.findOne({ username }).lean();
    if (!doc) return res.status(404).json({ message: 'Profile not found' });
    return res.json({ deployed: true, portfolioUrl: `${DEPLOYED_APP_URL}/${username}`, username });
  } catch {
    return res.status(404).json({ message: 'Profile not found' });
  }
});

router.get('/qrcode/:username', async (req, res) => {
  const { username } = req.params;

  const inMemory = userProfiles.has(username);
  if (!inMemory && mongoose.connection.readyState === 1) {
    try {
      const doc = await PortfolioDeployment.findOne({ username }).lean();
      if (!doc) return res.status(404).json({ message: 'Profile not found' });
    } catch {
      return res.status(404).json({ message: 'Profile not found' });
    }
  } else if (!inMemory) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const portfolioUrl = `${DEPLOYED_APP_URL}/${username}`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(portfolioUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0E1627',
        light: '#F4E1E0',
      },
      errorCorrectionLevel: 'H',
    });

    res.json({
      qrCode: qrCodeDataUrl,
      portfolioUrl,
      username,
    });
  } catch (err) {
    console.error('QR code generation error:', err);
    res.status(500).json({ message: 'Failed to generate QR code' });
  }
});

module.exports = router;
