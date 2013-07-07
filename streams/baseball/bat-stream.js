'use strict';
var Liner = require('liner');
var stream = require('stream');
var util = require('util');

function BatStream() {
  stream.Transform.call(this, {objectMode: true});
  new Liner('./MLB_batters_2011.txt').pipe(this);
}
util.inherits(BatStream, stream.Transform);

BatStream.prototype._transform = function (line, encoding, cb) {
  var pieces = line.split('\t');
  this.push({
    name: pieces[0],
    team: pieces[2],
    ab: pieces[4],
    hits: pieces[6],
    avg: pieces[15]
  });
  cb();
};

module.exports = BatStream;
