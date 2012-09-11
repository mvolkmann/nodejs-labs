'use strict';
var async = require('async');
var fs = require('fs');

var dir = '.';

/**
 * Gets an fs.Stats object for every file in a given directory.
 * @param dir a directory path
 * @param cb callback that is passed err and an array of fs.Stats objects
 */
function getStats(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      return cb(err);
    }

    var stats = {};

    // This function is passed to async.every below.
    var iterator = function (file, cb) {
      // Skip hidden files (start with a period).
      if (/^\./.test(file)) {
        return cb(true);
      }

      // Skip Vim backup files (end with a tilde).
      if (/~$/.test(file)) {
        return cb(true);
      }

      fs.stat(file, function (statErr, stat) {
        if (statErr) {
          err = statErr;
        } else {
          stats[file] = stat;
        }

        cb(!err); // stops async.every when there is an error
      });
    };

    async.every(files, iterator, function (result) {
      cb(err, stats);
    });
  });
}

/**
 * Reports activity for a single file.
 * @param name file name
 * @param oldStat fs.Stats object
 * @param newStat fs.Stats object
 */
function report(name, oldStat, newStat) {
  if (!oldStat && newStat) {
    console.log(name, 'was created');
    return;
  }

  var modified = newStat.mtime > oldStat.mtime;
  if (modified) {
    var diff = newStat.size - oldStat.size;
    var suffix = Math.abs(diff) === 1 ? 'byte' : 'bytes';
    var desc =
      diff > 0 ? 'increased by ' + diff + ' ' + suffix :
      diff < 0 ? 'decreased by ' + -diff + ' ' + suffix :
      'did not change';
    console.log(name, 'content modified, size', desc);
  }
}

var oldStats;
// Counting on this to finish before changes in the directory begin.
getStats(dir, function (err, stats) {
  oldStats = stats;
});

// Under Mac OS X, null is always passed to the callback for filePath.
// The callback is invoked when any file in the directory
// is created, deleted, or has its contents modified (mtime and ctime).
// It is not invoked when a file is merely accessed (atime).
// It is not invoked when the owner of a file is changed (ctime).
// It is not invoked when the permissions on a file are changed (ctime).
fs.watch(dir, function (event) {
  // event is always 'rename'!
  getStats(dir, function (err, newStats) {
    if (err) {
      return console.error(err);
    }

    Object.keys(oldStats).forEach(function (name) {
      if (!newStats[name]) {
        console.log(name, 'was deleted');
      }
    });

    Object.keys(newStats).forEach(function (name) {
      report(name, oldStats[name], newStats[name]);
    });

    oldStats = newStats;
  });
});
