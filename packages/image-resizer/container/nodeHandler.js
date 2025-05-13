const http = require('http');

const { handleResize } = require('./index');
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { url, width, height } = JSON.parse(body);
        handleResize(url, width, height)
          .then(resizedImageUrl => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ resizedImageUrl }));
          })
          .catch(error => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error }));
          });
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error }));
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Node server running at http://localhost:${PORT}`);
});
