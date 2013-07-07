'use strict';
var async = require('async');
var fs = require('fs');

var filePath = 'foo.txt';
//var filePath = 'TaleOfTwoCities.txt';

// Read entire file in one call.
fs.readFile(filePath, function (err, buf) {
  if (err) {
    throw err;
  }
  console.log(buf.toString());
});

// Read file in chunks from a stream.
var rs = fs.createReadStream(filePath);
//rs.setEncoding('binary');
rs.on('readable', function () {
  while (true) {
    var buf = rs.read();
    if (buf === null) break;
    console.log(buf.toString());
  }
});

// This approach has the following advantages:
// * can read from a specified chunk of the file
// * can write into a specified chunk of the Buffer
// Disadvantage include:
// * all the things above MUST be specified
// * the code is longer and more complicated
fs.open(filePath, 'r', function (err, fd) {
  if (err) throw err;

  var maxSize = 1000, buf = new Buffer(maxSize);
  fs.read(fd, buf, 0, buf.length, 0, function (err, bytesRead) {
    if (err) throw err;

    console.log(buf.toString().substring(0, bytesRead));
    fs.close(fd);
  });
});
