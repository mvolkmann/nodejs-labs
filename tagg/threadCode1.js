'use strict';
/*global puts: false, thread: false */
// require is not defined here!
//var util = require('util');

// console is not defined here!
//console.log(__dirname, 'is loading');
// __dirname is not defined here!
// Unlike console.log, puts doesn't output a space  between
// arguments and doesn't output a newline at the end.
puts('thread code loading\n');

var n = 5 / 0; // cause an error
This is a syntax error.

function hello(name) {
  puts('Hello, ' + name + '!\n');
}

// Cannot use "this" in place of "thread" on next line.
thread.on('incrRequest', function (json) {
  var obj = JSON.parse(json);
  puts('in thread, obj = ', obj, '\n');
  obj.score += 1;
  this.emit('incrResponse', JSON.stringify(obj));
});
