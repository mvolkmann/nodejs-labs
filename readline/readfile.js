'use strict';
var fs = require('fs');
var rl = require('readline');
var stream = require('stream');
var util = require('util');

// Define a writable stream that does nothing.
function NullStream() {
  stream.Writable.call(this);
}
util.inherits(NullStream, stream.Writable);
NullStream.prototype._write = function (chunk, encoding, cb) {
  // This is called once for each character that is read.
  //console.log('chunk =', chunk.toString(encoding));
  cb();
};

var intf = rl.createInterface(
  fs.createReadStream('data.txt'),
  new NullStream()
);

intf.on('line', function (line) {
  console.log('line: ' + line);
});

intf.on('close', function () {
  console.log('got close event');
});
