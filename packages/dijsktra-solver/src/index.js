const Graph = require('node-dijkstra');

const complexGraph = require('../data/complex-graph.json');

const route = new Graph(complexGraph);

const path = route.path('Node_0', 'Node_31', { cost: true });

console.log(path);
