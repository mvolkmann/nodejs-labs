'use strict';
var Stream = require('stream');
var util = require('util');

function TeamFilter(team) {
  Stream.call(this);
  this.team = team;
  this.writable = true; // must do this
}
util.inherits(TeamFilter, Stream);

TeamFilter.prototype.end = function () {
  this.emit('end');
};

TeamFilter.prototype.write = function (stat) {
  if (stat.team === this.team) {
    this.emit('data', stat);
  }
  return true;
};

module.exports = TeamFilter;
