'use strict';
var async = require('async');

/**
 * Returns percentage string with two decimal places and '%' at end.
 */
function percent(total, amount) {
  return (amount / total * 100.0).toFixed(2) + '%';
}

console.log(percent(7, 5));

var p7 = percent.bind(null, 7);
console.log(p7(5));

var p7 = async.apply(percent, 7);
console.log(p7(5));
