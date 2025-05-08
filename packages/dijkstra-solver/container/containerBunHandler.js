const { findShortestPath } = require('../findShortestPath');

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        const { start, end, graph } = body;
        const shortestPath = findShortestPath(start, end, graph);

        return new Response(JSON.stringify({ shortestPath }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  },
});

console.log(`Bun server running at http://localhost:${server.port}`);
