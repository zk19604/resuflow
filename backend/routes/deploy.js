const express = require('express');
const { z } = require('zod');
const { deployPortfolio } = require('../services/vercel.service');
const AppError = require('../services/AppError');

const router = express.Router();

const MAX_HTML_SIZE = 500 * 1024;

const deploySchema = z.object({
  userId: z.string().min(1, 'userId is required').max(100),
  html: z.string().min(1, 'html is required').max(MAX_HTML_SIZE, 'HTML exceeds 500KB limit'),
});

const rateLimitMap = new Map();

function checkRateLimit(userId) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 3;

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
    const parseResult = deploySchema.safeParse(req.body);
    if (!parseResult.success) {
      const errors = parseResult.error.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const { userId, html } = parseResult.data;

    if (!checkRateLimit(userId)) {
      return res.status(429).json({ message: 'Rate limit exceeded: max 3 deployments per hour' });
    }

    const result = await deployPortfolio(userId, html);
    res.json(result);

  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error('Deploy error:', error);
    res.status(500).json({ message: 'Deployment failed' });
  }
});

module.exports = router;
