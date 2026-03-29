require('dotenv').config();
const http = require('http');

const HTML_STRING = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Portfolio</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #333; }
    .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>ResuFlow Test Page</h1>
  <div class="card">
    <h2>John Doe</h2>
    <p>Software Engineer | AI Enthusiast</p>
    <p>Email: john@example.com</p>
  </div>
  <div class="card">
    <h3>Skills</h3>
    <ul>
      <li>JavaScript, Python, TypeScript</li>
      <li>React, Node.js, Express</li>
      <li>MongoDB, PostgreSQL</li>
    </ul>
  </div>
</body>
</html>`;

function makeRequest(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 3003,
      path: '/api/deploy',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(responseData) });
        } catch {
          resolve({ status: res.statusCode, body: responseData });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function test() {
  console.log('🧪 Testing Vercel Deploy API...\n');
  
  try {
    const response = await makeRequest({
      userId: 'test-user-001',
      html: HTML_STRING,
    });

    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.stringify(response.body, null, 2));

    if (response.body.liveUrl) {
      console.log('\n✅ Deployment successful!');
      console.log(`🔗 Live URL: ${response.body.liveUrl}`);
      console.log(`📱 QR Code: ${response.body.qrCode ? 'Generated (base64)' : 'Not generated'}`);
    } else if (response.body.message) {
      console.log('\n❌ Error:', response.body.message);
    }
  } catch (error) {
    console.error('\n❌ Request failed:', error.message);
    console.error('Make sure the server is running: node index.js');
  }
}

test();
