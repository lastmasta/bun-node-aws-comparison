'use strict';

const fs = require('fs');
const path = require('path');

const autocannon = require('autocannon');

const body = JSON.stringify({
  xmlUrl:
    'https://image-resizer-bucket-170191.s3.us-east-2.amazonaws.com/file.xml',
});

const instance = autocannon({
  url: 'https://ur3s2wl9c5.execute-api.us-east-2.amazonaws.com/dev/xml-parser-bun',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: body,
  connections: 5, // 5 concurrent connections
  duration: 60,
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
