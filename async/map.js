'use strict';
var async = require('async');
var fs = require('fs');

function getSize(filePath, cb) {
  fs.stat(filePath, function (err, stats) {
    cb(err, stats ? stats.size : 0);
  });
}

function accumulateSize(prev, filePath, cb) {
  getSize(filePath, function (err, size) {
    cb(err, err ? 0 : prev + size);
  });
}

var dir = '.';
fs.readdir(dir, function (err, files) {
  async.reduce(files, 0, accumulateSize, function (err, sum) {
    console.log('sum of file sizes is', sum);
  });
});
