'use strict';

var request = require('request');

// Run "node server.js" in a separate terminal before running this.
// This demonstrates sending a POST requests that includes query parameters
// and processing the response.
var options = {
  method: 'POST',
  url: 'http://localhost:3002',
  qs: {a: 1, b: 2, c: 3} // query parameters
};
request(options, function (err, res, body) {
  if (err) {
    console.error(err);
  } else {
    var sum = parseInt(body, 10);
    console.log('sum =', sum);
  }
});
