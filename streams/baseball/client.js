'use strict';
var BatStream = require('./bat-stream');
var TeamFilter = require('./team-filter');
var AverageFilter = require('./average-filter');

var bs = new BatStream();
var tf = new TeamFilter('STL');
var af = new AverageFilter(100, 0.3);
bs.pipe(tf).pipe(af);

af.on('data', function (stat) {
  console.log(stat.name, stat.team, stat.avg);
});

af.on('end', function () {
  console.log('got end');
});
