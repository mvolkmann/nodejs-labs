'use strict';

var async = require('async');
var fs = require('fs');

function atimeMs(filePath, cb) {
  console.log('getting atime for', filePath);
  fs.stat(filePath, function (err, stat) {
    // Get milliseconds from stat.atime Date object.
    var result = stat ? stat.atime.getTime() : null;
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
