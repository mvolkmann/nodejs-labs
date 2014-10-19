'use strict';
var FibStream = require('./fibstream');

var fibs = new FibStream(100);
// Use the next line to get all values
// up to the larged JavaScript can represent.
//var fibs = new FibStream();

fibs.on('data', function (fib) {
  console.log(fib);
});

fibs.on('end', function () {
  console.log('no more');
});
