const Graph = require('node-dijkstra');

const findShortestPath = (start, end, graph) => {
  const route = new Graph(graph);
  const path = route.path(start, end, { cost: true });
  return path;
};

exports.findShortestPath = findShortestPath;
