import http from 'http';
import httpProxy from 'http-proxy';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const proxy = httpProxy.createProxyServer({});
const PORT = 5000;

// Retrieve the Bearer token from the environment variable
const BEARER_TOKEN = process.env.ASTRIA_API_KEY;

const server = http.createServer((req, res) => {
  const target = 'https://api.astria.ai';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify a domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specify allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type'); // Specify allowed headers

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No content
    return res.end();
  }

  // Set the Authorization header for the proxied request
  req.headers['Authorization'] = `Bearer ${BEARER_TOKEN}`;

  proxy.web(req, res, { target, changeOrigin: true }, (error) => {
    console.error('Proxy error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error occurred.');
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
