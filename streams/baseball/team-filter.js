'use strict';
var stream = require('stream');
var util = require('util');

function TeamFilter(team) {
  stream.Transform.call(this, {objectMode: true});
  this.team = team;
}
util.inherits(TeamFilter, stream.Transform);

TeamFilter.prototype._transform = function (stat, encoding, cb) {
  if (stat.team === this.team) {
    this.push(stat);
  }
  cb();
};

module.exports = TeamFilter;
