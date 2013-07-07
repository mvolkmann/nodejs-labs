'use strict';
var async = require('async');
var fs = require('fs');

var filePath = 'foo.txt';
var data = 'red\ngreen\nblue\n';

// If file already exists, content is replaced.
fs.writeFile(filePath, data, function (err, buf) {
  if (err) {
    throw err;
  }
});

var ws = fs.createWriteStream(filePath);
ws.write(data);
ws.end();

// This approach has the following advantages:
// * can write into a specified chunk of the file
// * can write from a specified chunk of the Buffer
// Disadvantage include:
// * all the things above MUST be specified
// * the code is longer and more complicated
var buf = new Buffer(data);
fs.open(filePath, 'w', function (err, fd) {
  if (err) throw err;
  fs.write(fd, buf, 0, buf.length, 0, function (err) {
    if (err) throw err;
    fs.close(fd);
  });
});
