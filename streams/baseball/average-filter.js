'use strict';
var stream = require('stream');
var util = require('util');

function AverageFilter(minAB, minAvg) {
  stream.Transform.call(this, {objectMode: true});
  this.minAB = minAB;
  this.minAvg = minAvg;
}
util.inherits(AverageFilter, stream.Transform);

AverageFilter.prototype._transform = function (stat, encoding, cb) {
  if (stat.ab >= this.minAB && stat.avg >= this.minAvg) {
    this.push(stat);
  }
  cb();
};

module.exports = AverageFilter;
