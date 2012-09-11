'use strict';
var fs = require('fs');

/**
 * Returns the number of times a given character
 * appears in a given text file.
 */
function countChar(filePath, char, cb) {
  fs.readFile(filePath, function (err, buf) {
    if (err) {
      return cb(err);
    }
    var text = buf.toString();
    var count = 0;
    for (var i = 0; i < text.length; i++) {
      if (text.charAt(i) === char) {
        count++;
      }
    }
    cb(null, count);
  });
}

exports.countChar = countChar;
