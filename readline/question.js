'use strict';
var rl = require('readline');

var intf = rl.createInterface(process.stdin, process.stdout);

intf.on('line', function (line) {
  // This is only invoked if more than one line is entered.
  // The question method doesn't emit this event.
  console.log('line event: got ' + line);
});

intf.question('What is your name? ', function (name) {
  console.log('Hello, ' + name + '!');
});
