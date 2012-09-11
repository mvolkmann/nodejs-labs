'use strict';
var fs = require('fs');
var os = require('os');

function readLines(filePath, cb) {
  var rs = fs.createReadStream(filePath, {bufferSize: 80});
  var leftover = '';
  rs.on('data', function (buf) {
    var lines = buf.toString().split(os.EOL);
    lines[0] = leftover + lines[0];
    leftover = lines.pop(); // chunk at end
    lines.forEach(function (line) {
      cb(line);
    });
  });
  rs.on('end', function () {
    if (leftover.length > 0) {
      cb(leftover);
    }
  });
}

readLines('story.txt', console.log);
