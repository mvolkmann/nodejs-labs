'use strict';
var fs = require('fs');
var os = require('os');

// This invokes the callback once for each line found in the file.
// A more common approach is to use an event emitter.
function readLines(filePath, cb) {
  var chunkSize = 80;
  var rs = fs.createReadStream(filePath, {bufferSize: chunkSize});
  var leftover = '';

  rs.on('readable', function () {
    while (true) {
      var buf = rs.read(chunkSize);
      if (buf === null) break;

      var lines = buf.toString().split(os.EOL);
      lines[0] = leftover + lines[0];
      leftover = lines.pop(); // partial line at end
      lines.forEach(function (line) {
        cb(line);
      });
    }
  });

  rs.on('end', function () {
    if (leftover.length > 0) {
      cb(leftover);
    }
  });
}

readLines('story.txt', console.log);
