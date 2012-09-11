'use strict';
var helper = require('./helper');

function triple(x) {
  return x * 3;
}

var x = 3;
debugger;

x += 2;

var y = triple(x);
y -= 1;
y = helper.half(y);

console.log(y);
