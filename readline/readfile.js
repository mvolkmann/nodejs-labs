'use strict';
var fs = require('fs');
var rl = require('readline');

var stream = fs.createReadStream('data.txt');
var intf = rl.createInterface(stream);
intf.prompt();

intf.on('line', function (line) {
  console.log('read: ' + line);
  intf.prompt();
});

intf.on('close', function () {
  console.log('got close event');
});
