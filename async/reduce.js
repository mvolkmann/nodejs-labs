'use strict';
var async = require('async');
var fs = require('fs');

function getSize(filePath, cb) {
  fs.stat(filePath, function (err, stats) {
    cb(err, stats ? stats.size : 0);
  });
}

var dir = '.';
fs.readdir(dir, function (err, files) {
  async.map(files, getSize, function (err, sizes) {
    var sum = sizes.reduce(function (prev, curr) {
      return prev + curr;
    });
    console.log('sum of file sizes is', sum);
  });
});
