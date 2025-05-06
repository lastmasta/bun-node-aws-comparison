const { findShortestPath } = require('./findShortestPath');

exports.dijkstraSolver = async event => {
  const { start, end, graph } = event;

  const shortestPath = findShortestPath(start, end, graph);

  return {
    shortestPath,
  };
};
