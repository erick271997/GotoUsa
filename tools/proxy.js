// Simple proxy server to fetch pages and serve them with a valid certificate.
// Usage:
// 1) npm install express node-fetch cors
// 2) node tools/proxy.js
// 3) Optionally run `ngrok http 3000` and use the https ngrok URL as PROXY_BASE in the app

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing url query parameter');

  try {
    const response = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Proxy/1.0)'
      }
    });

    const body = await response.text();
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.status(response.status).send(body);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).send('Proxy error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
  console.log('Use /proxy?url=<ENCODED_URL> to fetch remote pages');
});
