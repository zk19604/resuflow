const express = require('express');
const { z } = require('zod');
const AppError = require('../services/AppError');

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
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      linkedin: z.string(),
      github: z.string(),
      website: z.string(),
      portfolio: z.string(),
    }),
    summary: z.string(),
    workExperience: z.array(z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
      achievements: z.array(z.string()),
    })),
    education: z.array(z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      grade: z.string(),
    })),
    skills: z.object({
      technical: z.array(z.string()),
      tools: z.array(z.string()),
      soft: z.array(z.string()),
      domain: z.array(z.string()),
      languages: z.array(z.string()),
    }),
    certifications: z.array(z.object({
      name: z.string(),
      issuer: z.string(),
      date: z.string(),
    })),
    projects: z.array(z.object({
      name: z.string(),
      description: z.string(),
      tools: z.array(z.string()),
      link: z.string(),
      type: z.string(),
    })),
    achievements: z.array(z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
    })),
    volunteering: z.array(z.object({
      organization: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
    })),
    publications: z.array(z.object({
      title: z.string(),
      publisher: z.string(),
      date: z.string(),
      link: z.string(),
    })),
    references: z.array(z.object({
      name: z.string(),
      role: z.string(),
      contact: z.string(),
    })),
    extras: z.object({
      interests: z.array(z.string()),
      memberships: z.array(z.string()),
      speakingEngagements: z.array(z.string()),
    }),
  }),
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

router.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  const entry = userProfiles.get(username);

  if (!entry) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.json({ profile: entry.profile, config: entry.config || {} });
});

router.get('/status/:userId', async (req, res) => {
  const { userId } = req.params;
  const username = userId.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const profile = userProfiles.get(username);

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const portfolioUrl = `${DEPLOYED_APP_URL}/${username}`;
  res.json({
    deployed: true,
    portfolioUrl,
    username,
  });
});

module.exports = router;
