const Graph = require('node-dijkstra');

const complexGraph = require('../data/complex-graph.json');

const route = new Graph(complexGraph);

const path = route.path('Node1', 'Node1950', { cost: true });

console.log(path);
