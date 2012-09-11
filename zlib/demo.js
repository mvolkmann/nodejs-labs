'use strict';
var fs = require('fs');
var zlib = require('zlib');

function zipToFile(data, filePath, cb) {
  zlib.gzip(data, function (err, buffer) {
    if (err) return cb(err);
    fs.writeFile(filePath, buffer, cb);
  });
}

function unzipFromFile(filePath, cb) {
  fs.readFile(filePath, function (err, buffer) {
    if (err) return cb(err);
    zlib.gunzip(buffer, function (err, buffer) {
      cb(err, buffer.toString());
    });
  });
}

var filePath = 'message.gz';
var data = 'This is a message';
zipToFile(data, filePath, function (err) {
  if (err) throw err;
  unzipFromFile(filePath, function (err, result) {
    if (err) throw err;
    console.log('result =', result);
  });
});
