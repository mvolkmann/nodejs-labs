'use strict';
var async = require('async');
var fs = require('fs');

/**
 * Makes numbered directories.
 */
function makeDirs(name, count, cb) {
  var n = 0;
  async.whilst(
    function () {
      n++;
      return n <= count;
    },
    function (cb) {
      fs.mkdir(name + n, cb);
    },
    cb);
}

makeDirs('mydir', 3, function (err) {
  console.log(err ? err : 'success');
});
