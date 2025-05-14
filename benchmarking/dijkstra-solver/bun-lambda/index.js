'use strict';

const fs = require('fs');
const path = require('path');

const autocannon = require('autocannon');

const body = JSON.stringify(require('../body.json'));

const instance = autocannon({
  url: 'https://tuvt41iqpe.execute-api.us-east-2.amazonaws.com/bun',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: body,
  connections: 5, // 5 concurrent connections
  amount: 100, // total of 100 requests
});

// This will print the results when complete
autocannon.track(instance);

instance.on('done', results => {
  console.log(results);

  // Save results to a file
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const resultsFilePath = path.join(
    __dirname,
    `benchmark-results-${timestamp}.json`
  );

  fs.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Results saved to: ${resultsFilePath}`);
});
