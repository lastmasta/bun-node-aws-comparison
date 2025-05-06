const { findShortestPath } = require('./findShortestPath');

exports.dijkstraSolver = async event => {
  const body = event.aws;
  const { start, end, graph } = body;
  const shortestPath = findShortestPath(start, end, graph);

  return new Response(
    JSON.stringify({
      shortestPath,
    })
  );
};
