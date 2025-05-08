const http = require('http');

const { XMLParser } = require('fast-xml-parser');
const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { xml } = JSON.parse(body);
        const parser = new XMLParser();
        const parsedXml = parser.parse(xml);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ parsedXml }));
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
