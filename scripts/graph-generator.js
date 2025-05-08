/**
 * Generates a random graph with a specified number of nodes.
 *
 * The graph structure is an object where keys are node names (e.g., 'Node1')
 * and values are objects representing neighbors and their connection costs.
 * Connections are bidirectional.
 *
 * Example Output Structure:
 * {
 * 'Node1': { 'Node2': 5, 'Node3': 2 },
 * 'Node2': { 'Node1': 5 },
 * 'Node3': { 'Node1': 2 }
 * }
 *
 * @param {number} n The number of nodes to generate (must be a non-negative integer).
 * @param {number} [density=0.3] Optional: The probability (0 to 1) of an edge existing
 * between any two distinct nodes. Defaults to 0.3 (30%).
 * @param {number} [maxCost=10] Optional: The maximum integer cost for an edge. Defaults to 10.
 * @returns {object} The generated graph object. Returns an empty object if n <= 0.
 */
function generateRandomGraph(n, density = 0.3, maxCost = 10) {
  // Input validation
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
    console.error("Error: Number of nodes 'n' must be a non-negative integer.");
    return {};
  }
  if (typeof density !== 'number' || density < 0 || density > 1) {
    console.warn(
      'Warning: Density should be between 0 and 1. Using default 0.3.'
    );
    density = 0.3;
  }
  if (
    typeof maxCost !== 'number' ||
    !Number.isInteger(maxCost) ||
    maxCost < 1
  ) {
    console.warn(
      'Warning: Max cost must be an integer >= 1. Using default 10.'
    );
    maxCost = 10;
  }

  const graph = {};
  const nodes = [];

  // 1. Generate node names and initialize graph structure
  for (let i = 1; i <= n; i++) {
    const nodeName = `Node${i}`;
    nodes.push(nodeName);
    graph[nodeName] = {}; // Initialize neighbors object for each node
  }

  // 2. Iterate through all unique pairs of nodes to potentially create edges
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Start j from i + 1 to avoid self-loops and duplicate pairs
      // Decide randomly whether to create an edge based on density
      if (Math.random() < density) {
        // Generate a random cost (integer between 1 and maxCost)
        const cost = Math.floor(Math.random() * maxCost) + 1;

        const nodeA = nodes[i];
        const nodeB = nodes[j];

        // Add bidirectional connection
        graph[nodeA][nodeB] = cost;
        graph[nodeB][nodeA] = cost;
      }
    }
  }

  return graph;
}

// Parse command line arguments
const args = process.argv.slice(2);
let n, density, maxCost;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--n' && i + 1 < args.length) {
    n = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--density' && i + 1 < args.length) {
    density = parseFloat(args[i + 1]);
    i++;
  } else if (args[i] === '--max-cost' && i + 1 < args.length) {
    maxCost = parseInt(args[i + 1], 10);
    i++;
  }
}

const graph = generateRandomGraph(n, density, maxCost);

// The graph is too large to stringify with indentation
// Use a more efficient approach to write the file
const fs = require('fs');
const path = require('path');
const outputPath = path.join(process.cwd(), 'output', 'graph.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const stream = fs.createWriteStream(outputPath);

// Write the opening brace
stream.write('{\n');

// Write each node and its connections
const nodeKeys = Object.keys(graph);
nodeKeys.forEach((node, index) => {
  stream.write(`  "${node}": ${JSON.stringify(graph[node])}`);

  // Add comma for all but the last node
  if (index < nodeKeys.length - 1) {
    stream.write(',\n');
  } else {
    stream.write('\n');
  }
});

// Write the closing brace
stream.write('}\n');

// Close the stream
stream.end();
console.log('Graph written to graph.json');
