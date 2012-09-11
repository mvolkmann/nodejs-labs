'use strict';
var async = require('async');
var fs = require('fs');

function getSize(filePath, cb) {
  //console.log('getSize: filePath =', filePath);
  fs.stat(filePath, function (err, stats) {
    //if (/foo/.test(filePath)) {
    //  err = 'foo!';
    //}
    cb(err, [filePath, stats.size]);
  });
}

var dir = '.';
fs.readdir(dir, function (err, files) {
  var tasks = files.map(function (fileName) {
    return getSize.bind(null, dir + '/' + fileName);
  });

  async.parallel(tasks, function (err, results) {
    console.log(err ? err : results);
  });
});
