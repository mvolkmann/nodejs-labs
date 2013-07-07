'use strict';

var rpn = require('./stdio-rpn');

var filePath = process.argv[2];
if (!filePath) {
  console.error('missing file path command line argument');
  process.exit(1);
}

// mkdir node_modules; npm install liner
var Liner = require('liner');
var liner = new Liner(filePath);

var result;

liner.on('data', function (line) {
  result = rpn.evaluate(line, true);
});

liner.on('end', function () {
  console.log(result);
  process.exit(0);
});
