'use strict';
var stream = require('stream');
var util = require('util');

function FibStream(max) {
  stream.Readable.call(this, {objectMode: true});
  this.max = max;
  this.v0 = 0;
  this.v1 = 1;
  this.push(0);
  this.push(1);
}
util.inherits(FibStream, stream.Readable);

FibStream.prototype._read = function () {
  var next = this.v0 + this.v1;
  var stop = next === Number.POSITIVE_INFINITY || (this.max && next > this.max);
  if (stop) {
    this.push(null);
  } else {
    this.v0 = this.v1;
    this.v1 = next;
    this.push(next);
  }
};

module.exports = FibStream;
