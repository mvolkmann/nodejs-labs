'use strict';

var _ = require('underscore');

function hello(name) {
  console.log('Hello,', name + '!');
  return 2;
}

// This shows that _.times doesn't return anything.
var result = _.times(3, hello.bind(null, 'World'));
console.log('result =', result);
