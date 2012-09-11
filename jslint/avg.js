'use strict';

function avg(arr) {
  var sum = arr.reduce(function (a, b) {
    return a + b;
  });
  return sum / arr.length;
}

console.log(avg([1, 2, 3, 4]));
