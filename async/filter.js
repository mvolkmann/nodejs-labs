'use strict';

var async = require('async');

// Generate 20 integers between 1 and 100.
var arr = [];
for (var i = 0; i < 20; i++) {
  arr.push(Math.floor(Math.random() * 100) + 1);
}
console.log(arr);

// Output generated integers that are multiples of 3.
async.filter(
  arr,
  function (n, cb) { cb(n % 3 === 0); },
  function (result) { console.log(result); });
