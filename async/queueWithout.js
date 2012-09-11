'use strict';
var async = require('async');
var fs = require('fs');

// Find the largest file in or below a given directory.
function findLargestFile(dir, cb) {
  var maxPath = null, maxSize = 0;

  function check(path, size) {
    if (size > maxSize) {
      maxPath = path;
      maxSize = size;
    }
  }

  fs.readdir(dir, function (err, files) {
    if (err) return cb(err);
    async.forEach(files,
      function (file, cb) {
        var path = dir + '/' + file;
        fs.stat(path, function (err, stats) {
          if (err) {
            cb(err);
          } else if (stats.isDirectory()) {
            findLargestFile(path, function (err, path, size) {
              if (!err) {
                check(path, size);
              }
              cb(err);
            });
          } else {
            check(path, stats.size);
            cb();
          }
        });
      },
      function (err) {
        cb(err, maxPath, maxSize);
      });
  });
}

var dir = '/Users/Mark/Documents/OCI/SVN/training/Node.js';
findLargestFile(dir, function (err, path, size) {
  if (err) {
    throw err;
  }
  console.log(path, 'is', size, 'bytes');
});
