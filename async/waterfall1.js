'use strict';
var async = require('async');
var fs = require('fs');
var rimraf = require('rimraf'); // https://github.com/isaacs/rimraf

var dirPath = 'foo';
var fileName = 'bar.txt';
var filePath = dirPath + '/' + fileName;
var content = 'some content';
async.waterfall(
  [
    function (cb) {
      rimraf(dirPath, cb);
    },
    function (cb) {
      fs.mkdir(dirPath, cb);
    },
    function (cb) {
      fs.writeFile(filePath, content, cb);
    },
    function (cb) {
      fs.stat(filePath, cb);
    },
  ],
  function (err, stats) {
    if (err) {
      throw err;
    }
    console.log('size is ' + stats.size);
  });
