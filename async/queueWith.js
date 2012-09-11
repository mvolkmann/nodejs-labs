'use strict';
var async = require('async');
var fs = require('fs');

// Find the largest file in or below a given directory.
function findLargestFile(dirPath, cb) {
  var maxPath = null, maxSize = 0, queue;

  function worker(path, cb) {
    fs.stat(path, function (err, stats) {
      if (err) {
        cb(err);
      } else if (stats.isDirectory()) {
        fs.readdir(path, function (err, files) {
          if (!err) {
            files.forEach(function (file) {
              queue.push(path + '/' + file);
            });
          }
          cb(err);
        });
      } else {
        if (stats.size > maxSize) {
          maxPath = path;
          maxSize = stats.size;
        }
        cb();
      }
    });
  }

  queue = async.queue(worker, 16);
  queue.drain = function () {
    cb(maxPath, maxSize);
  };
  queue.push(dirPath);
}

var dir = '/Users/Mark/Documents/OCI/SVN/training/Node.js';
findLargestFile(dir, function (path, size) {
  console.log(path, 'is', size, 'bytes');
});
