'use strict';

var rpn = require('./stdio-rpn');

var filePath = process.argv[2];
if (!filePath) {
  console.error('missing file path command line argument');
  process.exit(1);
}

// npm install liner
var Liner = require('liner');
var liner = new Liner(filePath);

var result;

liner.on('data', function (line) {
  // The 2nd arg to evaluate isn't needed in student solution.
  // It controls whether logging in my evaluate method is silent.
  // I found it useful for debugging.
  result = rpn.evaluate(line, true);
});

liner.on('error', function (err) {
  console.error('err =', err);
});

liner.on('end', function () {
  console.log(result);
  process.exit(0);
});
