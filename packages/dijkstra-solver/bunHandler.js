const { findShortestPath } = require('./findShortestPath');

exports.dijkstraSolver = async event => {
  const { aws } = event;
  const { body } = aws;
  const { start, end, graph } = JSON.parse(body);

  const shortestPath = findShortestPath(start, end, graph);

  return Response.json({
    shortestPath,
  });
};
