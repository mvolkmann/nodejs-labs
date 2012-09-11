'use strict';
var assert = require('assert');
var matrix = require('./matrix');

// This example was taken from
// http://en.wikipedia.org/wiki/Matrix_multiplication
var m1 = [
  [14, 9, 3],
  [2, 11, 15],
  [0, 12, 17],
  [5, 2, 3]
];

var m2 = [
  [12, 25],
  [9, 10],
  [8, 5]
];

var expected = [
  [273, 455],
  [243, 235],
  [244, 205],
  [102, 160]
];

matrix.multiply(m1, m2, function (err, actual) {
  if (err) {
    console.error(err);
  } else {
    assert.deepEqual(actual, expected);
    console.log(actual);
  }
});

console.log('returned from async call to matMult');
