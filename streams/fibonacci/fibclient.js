'use strict';
var FibStream = require('./fibstream');

var fibs = new FibStream(100);
//var fibs = new FibStream();

fibs.on('readable', function () {
  while (true) {
    var fib = fibs.read();
    if (fib === null) break;
    console.log(fib);
  }
});

fibs.on('end', function () {
  console.log('no more');
});
