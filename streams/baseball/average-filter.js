'use strict';
var Stream = require('stream');
var util = require('util');

function AverageFilter(minAB, minAvg) {
  Stream.call(this);
  this.minAB = minAB;
  this.minAvg = minAvg;
  this.writable = true; // must do this
}
util.inherits(AverageFilter, Stream);

AverageFilter.prototype.end = function () {
  this.emit('end');
};

AverageFilter.prototype.write = function (stat) {
  var avg = parseFloat(stat.avg);
  if (stat.ab >= this.minAB && avg >= this.minAvg) {
    this.emit('data', stat);
  }
  return true;
};

module.exports = AverageFilter;
