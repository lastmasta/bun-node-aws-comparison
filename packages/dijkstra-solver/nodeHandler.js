const { findShortestPath } = require('./findShortestPath');

exports.dijkstraSolver = async event => {
  const { body } = event;
  const { start, end, graph } = JSON.parse(body);

  const shortestPath = findShortestPath(start, end, graph);

  return {
    shortestPath,
  };
};
