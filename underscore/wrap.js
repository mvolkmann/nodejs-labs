'use strict';

var _ = require('underscore');

function hello(first, last) {
  console.log('Hello,', first, last);
}

var wrappedHello = _.wrap(hello, function (fn) {
  console.log('calling hello');
  var args = _.toArray(arguments).slice(1); // removes fn arg
  var first = args[0];
  var last = args[1];
  fn(first + 'y', last);
  console.log('returned from hello');
});

wrappedHello('Mark', 'Volkmann');
