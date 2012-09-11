'use strict';
var async = require('async');
var fs = require('fs');

var filePath = 'foo.txt';
var data = 'red\ngreen\nblue\n';

var buf = new Buffer(data);
var mode = 'ax';
var openFile = fs.open.bind(null, filePath, 'w');
var write = function (fd, cb) {
  fs.write(fd, buf, 0, buf.length, 0, function (err) {
    cb(err, fd);
  });
};
async.waterfall([openFile, write, fs.close], function (err) {
  if (err) {
    throw err;
  } else {
    console.log('success');
  }
});
