'use strict';

var async = require('async');
var fs = require('fs');

function atimeMs(filePath, cb) {
  console.log('getting atime for', filePath);
  fs.stat(filePath, function (err, stat) {
    // Convert stat.atime date string to milliseconds.
    var result = stat ? Date.parse(stat.atime) : null;
    cb(err, result);
  });
}

var fn = async.memoize(atimeMs);

// __filename holds path to this file.
fn(__filename, function (err, result) {
  console.log(result);

  fn(__filename, function (err, result) {
    console.log(result);

    fn = async.unmemoize(fn);
    fn(__filename, function (err, result) {
      console.log(result);
    });
  });
});
