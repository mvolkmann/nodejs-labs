'use strict';
var async = require('async');
var fs = require('fs');

var filePath = 'foo.txt';
//var filePath = 'TaleOfTwoCities.txt';

fs.readFile(filePath, function (err, buf) {
  if (err) {
    throw err;
  }
  console.log(buf.toString());
});

var rs = fs.createReadStream(filePath);
rs.setEncoding('binary');
rs.on('data', function (buf) {
  //console.log(buf.toString());
  console.log('got data');
});

// This approach has the following advantages:
// * can read from a specified chunk of the file
// * can read into a specified chunk of the Buffer
// Disadvantage include:
// * all the things above MUST be specified
// * the code is longer and more complicated
var maxSize = 100;
var buf = new Buffer(maxSize);
var openFile = fs.open.bind(null, filePath, 'r');
var readFile = function (fd, cb) {
  fs.read(fd, buf, 0, buf.length, 0, function (err, bytesRead) {
    console.log(buf.toString());
    cb(err, fd);
  });
};
async.waterfall([openFile, readFile, fs.close], function (err) {
  if (err) {
    throw err;
  }
});
