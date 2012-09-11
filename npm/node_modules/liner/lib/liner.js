'use strict';
var fs = require('fs');

var NEWLINE = process.platform === 'win32' ? '\r\n' : '\n';
// could also split on this RegExp: /\r\n|\r|\n/

/**
 * Reads lines from a given ReadStream.
 * @param readStream the ReadStream
 * @param cb callback that is passed an error description, if any,
 *   and a line or null if the end of the stream is reached
 */
function fromStream(readStream, cb) {
  var leftover = '';

  readStream.on('data', function (buffer) {
    var lines = buffer.toString().split(NEWLINE);
    lines[0] = leftover + lines[0];
    leftover = lines.pop();
    lines.forEach(function (line) {
      cb(null, line);
    });
  });

  readStream.on('error', function (err) {
    cb(err);
  });

  readStream.on('close', function (err) {
    cb(null, null);
  });
}

/**
 * Reads lines from a given file path.
 * @param filePath the file path
 * @param bufferSize the buffer size used to read the file
 *   (optional; defaults to 512)
 * @param cb callback that is passed an error description, if any,
 *   and a line or null if the end of the stream is reached
 */
function fromPath(filePath, bufferSize, cb) {
  if (!cb) {
    cb = bufferSize;
    bufferSize = 512;
  }
  var rs = fs.createReadStream(filePath, {bufferSize: bufferSize});
  fromStream(rs, cb);
}

exports.fromPath = fromPath;
exports.fromStream = fromStream;
