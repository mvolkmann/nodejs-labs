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
    rimraf.bind(null, dirPath),
    fs.mkdir.bind(null, dirPath),
    fs.writeFile.bind(null, filePath, content),
    fs.stat.bind(null, filePath)
  ],
  function (err, stats) {
    if (err) {
      throw err;
    }
    console.log('size is ' + stats.size);
  });
