'use strict';
var async = require('async');
var fs = require('fs');

var filePath = 'foo.txt';
var mode = 'w+'; // read/write, if exists then truncate else create
var buf = new Buffer('first line\nsecond line\n');

/*
// Approach #1 - indentation out of control and too much error checking
fs.open(filePath, mode, function (err, fd) {
  if (err) {
    console.error(err);
    return;
  }
  fs.write(fd, buf, 0, buf.length, 0, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    fs.close(fd, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('closed file');
    });
  });
});
*/

/*
// Approach #2
async.waterfall([
  fs.open.bind(null, filePath, mode),
  function (fd, cb) {
    fs.write(fd, buf, 0, buf.length, 0, function (err) {
      cb(err, fd);
    });
  },
  fs.close],
  function (err) {
    if (err) {
      console.error(err);
    }
  });
*/

// Approach #3
var open = fs.open.bind(null, filePath, mode);
var write = function (fd, cb) {
  fs.write(fd, buf, 0, buf.length, 0, function (err) {
    cb(err, fd);
  });
};
async.waterfall([open, write, fs.close], function (err) {
  if (err) {
    console.error(err);
  }
});
