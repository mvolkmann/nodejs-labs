'use strict';
var fs = require('fs');
var Stream = require('stream');
var util = require('util');

var NEWLINE = process.platform === 'win32' ? '\r\n' : '\n';
// could also split on this RegExp: /\r\n|\r|\n/

/**
 * Reads lines from a given ReadStream.
 * @param readStream the ReadStream
 * @param cb callback that is passed an error description, if any,
 *   and a line or null if the end of the stream is reached;
 *   omit to use as a stream
 */
function fromStream(readStream, cb) {
  var leftover = '';
  /*jshint validthis: true */
  var that = this;

  readStream.on('data', function (buffer) {
    var lines = buffer.toString().split(NEWLINE);
    lines[0] = leftover + lines[0];
    leftover = lines.pop();
    lines.forEach(function (line) {
      if (cb) {
        cb(null, line);
      } else {
        that.emit('data', line);
      }
    });
  });

  readStream.on('end', function () {
    if (leftover.length > 0) {
      if (cb) {
        cb(null, leftover);
      } else {
        that.emit('data', leftover);
      }
    }
  });

  readStream.on('error', function (err) {
    if (cb) {
      cb(err);
    } else {
      that.emit('error', err);
    }
  });

  readStream.on('close', function (err) {
    if (cb) {
      cb(null, null);
    } else {
      that.emit('end');
    }
  });
}

/**
 * Reads lines from a given file path.
 * @param filePath the file path
 * @param bufferSize the buffer size used to read the file
 *   (optional; defaults to 512)
 * @param cb callback that is passed an error description, if any,
 *   and a line or null if the end of the stream is reached;
 *   omit to use as a stream
 */
function fromPath(filePath, bufferSize, cb) {
  if (!cb) {
    cb = bufferSize;
    bufferSize = 512;
  }
  var rs = fs.createReadStream(filePath, {bufferSize: bufferSize});
  /*jshint validthis: true */
  fromStream.bind(this, rs, cb)();
}

function Liner(filePath, bufferSize) {
  Stream.call(this);
  fromPath.bind(this, filePath, bufferSize)();
}
util.inherits(Liner, Stream);

Liner.fromPath = fromPath;
Liner.fromStream = fromStream;

module.exports = Liner;
