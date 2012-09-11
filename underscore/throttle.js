'use strict';

var _ = require('underscore');

function hello(n) {
  console.log('Hello,', n);
}

//var fn = _.throttle(hello, 100);
var fn = _.debounce(hello, 100);

for (var i = 0; i < 10000; i++) {
  fn(i);
}
