'use strict';

var _ = require('underscore');

var divideBy3 = function (n) { return n / 3; }
var add5 = function (n) { return n + 5; }
var multiplyBy2 = function (n) { return n * 2; }
var fn = _.compose(divideBy3, add5, multiplyBy2);

console.log(fn(2));
