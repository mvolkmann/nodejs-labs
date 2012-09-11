'use strict';
var async = require('async');
var fs = require('fs');

function fileSize(path, cb) {
  fs.stat(path, function (err, stat) {
    cb(err, stat ? stat.size : 0);
  });
}

// Get list of files in current directory.
fs.readdir('.', function (err, files) {
  if (err) {
    return console.error(err);
  }

  // Output list of files sorted by size ... smallest first.
  async.sortBy(files, fileSize, function (err, sorted) {
    sorted.forEach(function (name) {
      console.log(name);
    });
  });
});
