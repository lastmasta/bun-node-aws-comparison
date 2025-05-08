const http = require('http');

const { findShortestPath } = require('../findShortestPath');

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { start, end, graph } = JSON.parse(body);
        const shortestPath = findShortestPath(start, end, graph);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ shortestPath }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
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
