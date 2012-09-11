'use strict';

var _ = require('underscore');

function hello(n) {
  console.log('Hello,', n);
}

var fn = _.after(5, hello);

for (var i = 0; i < 10; i++) {
  fn(i);
}
