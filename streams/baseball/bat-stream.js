'use strict';
var Liner = require('liner');
var Stream = require('stream');
var util = require('util');

function BatStream() {
  Stream.call(this);
  this.writable = true;
  new Liner('./MLB_batters_2011.txt').pipe(this);
}
util.inherits(BatStream, Stream);

BatStream.prototype.write = function (line) {
  var pieces = line.split('\t');
  this.emit('data', {
    name: pieces[0],
    team: pieces[2],
    ab: pieces[4],
    hits: pieces[6],
    avg: pieces[15],
  });
};

BatStream.prototype.end = function () {
  this.emit('end');
};

module.exports = BatStream;
