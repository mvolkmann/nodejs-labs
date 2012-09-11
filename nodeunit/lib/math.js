'use strict'
var fs = require('fs');

function isComment(s) {
  return /^\/\//.test(s); // starts with slash slash
}

/**
 * Returns the sum of the arguments.
 */
function sum() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

function sumArray(arr) {
  return sum.apply(null, arr);
}

function sumFile(path, cb) {
  fs.readFile(path, function (err, buffer) {
    if (err) {
      return cb(err);
    }

    var lines = buffer.toString().split('\n');
    var numbers = [];
    lines.every(function (line) {
      if (line.length > 0 && !isComment(line)) {
        var number = parseInt(line, 10);
        if (isNaN(number)) {
          err = line + ' is not a number';
        } else {
          numbers.push(number);
        }
      }
      return !err;
    });
    //console.log('numbers =', numbers);
    cb(err, sumArray(numbers));
  });
}

exports.sum = sum;
exports.sumArray = sumArray;
exports.sumFile = sumFile;
