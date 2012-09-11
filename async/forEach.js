'use strict';
var async = require('async');
var fs = require('fs');

var max = {size: 0};

function getSize(filePath, cb) {
  fs.stat(filePath, function (err, stats) {
    cb(err, stats ? stats.size : null);
  });
}

function updateMax(filePath, cb) {
  getSize(filePath, function (err, size) {
    if (!err && size > max.size) {
      max = {path: filePath, size: size};
    }
    cb(err);
  });
}

var dir = '.';
fs.readdir(dir, function (err, files) {
  async.forEachLimit(files, 5, updateMax, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('largest file is', max.path,
        'with', max.size, 'bytes');
    }
  });
});
