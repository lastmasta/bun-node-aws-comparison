const Graph = require('node-dijkstra');

const route = new Graph({
  A: {
    B: 1,
  },
  B: {
    A: 1,
    C: 2,
    D: 4,
  },
  C: {
    B: 2,
    D: 1,
  },
  D: {
    C: 1,
  },
});

route.path('A', 'D'); // => [ 'A', 'B', 'C', 'D' ]
