'use strict';

var _ = require('underscore');
var arr = [19, 2, 31, 14, 56];

function compareNumbers(a, b) { return a - b; }

// With chaining
console.log('with chaining');
var sum = _.chain(arr)
  .sortBy(compareNumbers)
  .tap(function (arr) { console.log('first', _.first(arr)); })
  .tap(function (arr) { console.log('last', _.last(arr)); })
  .reduce(function (n1, n2) { return n1 + n2; })
  .value();
console.log('sum =', sum);

// Without chaining
console.log('\nwithout chaining');
arr = arr.sort(compareNumbers);
console.log('arr =', arr);
console.log('first', _.first(arr));
console.log('last', _.last(arr));
var sum = _.reduce(arr, function (n1, n2) { return n1 + n2; })
console.log('sum =', sum);
