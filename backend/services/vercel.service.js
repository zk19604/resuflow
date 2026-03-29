const https = require('https');
const QRCode = require('qrcode');
const AppError = require('./AppError');

const VERCEL_API = 'api.vercel.com';
const MAX_RETRIES = 3;
const POLL_MAX_ATTEMPTS = Number(process.env.VERCEL_POLL_MAX_ATTEMPTS || 30);
const POLL_INTERVAL_MS = Number(process.env.VERCEL_POLL_INTERVAL_MS || 4000);
const MAX_HTML_SIZE = 500 * 1024;

async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await makeRequest(url, options);
    } catch (error) {
      if (attempt === retries) throw error;
      const delay = Math.pow(2, attempt) * 100;
      await sleep(delay);
    }
  }
}

function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: VERCEL_API,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy());
    if (options.body) req.write(options.body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deployToVercel(userId, htmlString) {
  console.log('Starting Vercel deployment for user:', userId);
  console.log('Vercel token exists:', !!process.env.VERCEL_TOKEN);
  
  if (!process.env.VERCEL_TOKEN) {
    throw new AppError('Vercel token not configured', 500);
  }

  if (htmlString.length > MAX_HTML_SIZE) {
    throw new AppError('HTML content exceeds 500KB limit', 413);
  }

  const base64Html = Buffer.from(htmlString).toString('base64');
  const deploymentName = `resuflow-${userId.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const createResponse = await fetchWithRetry(
    'https://api.vercel.com/v13/deployments',
    {
      method: 'POST',
      body: JSON.stringify({
        name: deploymentName,
        files: [{ file: 'index.html', data: base64Html, encoding: 'base64' }],
        projectSettings: { framework: null },
      }),
    }
  );

  console.log('Vercel create response status:', createResponse.status);
  console.log('Vercel create response body:', JSON.stringify(createResponse.body));

  if (createResponse.status !== 200 && createResponse.status !== 201) {
    throw new AppError(`Vercel deployment failed: ${createResponse.body.error?.message || 'Unknown error'}`, 502);
  }

  const deploymentId = createResponse.body.id;
  let lastKnownUrl = createResponse.body.url;
  let lastKnownState = createResponse.body.state;

  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    await sleep(POLL_INTERVAL_MS);

    const statusResponse = await fetchWithRetry(
      `https://api.vercel.com/v13/deployments/${deploymentId}`,
      { method: 'GET' }
    );

    const { state, url, aliasError } = statusResponse.body;
    lastKnownState = state;
    if (url) {
      lastKnownUrl = url;
    }

    if (state === 'READY') {
      return {
        liveUrl: `https://${url}`,
        deploymentId,
        status: 'ready',
      };
    }

    if (state === 'ERROR') {
      const errorMsg = aliasError || 'Deployment failed';
      throw new AppError(`Deployment error: ${errorMsg}`, 502);
    }
  }

  if (lastKnownUrl) {
    return {
      liveUrl: `https://${lastKnownUrl}`,
      deploymentId,
      status: 'pending',
      message: 'Deployment is still building. Check the URL again shortly.',
      lastKnownState,
    };
  }

  throw new AppError(`Deployment timed out for deployment ${deploymentId}`, 504);
}

async function generateQRCode(url) {
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    });
    return qrDataUrl;
  } catch (error) {
    throw new AppError('QR code generation failed', 500);
  }
}

async function deployPortfolio(userId, htmlString) {
  const deploymentResult = await deployToVercel(userId, htmlString);
  const { liveUrl } = deploymentResult;
  const qrCode = await generateQRCode(liveUrl);
  return { ...deploymentResult, qrCode };
}

module.exports = { deployPortfolio };
