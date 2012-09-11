'use strict';
var async = require('async');
var fs = require('fs');

var today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);

fs.readdir('.', function (err, files) {
  if (err) {
    return console.error(err);
  }

  function modifiedToday(file, cb) {
    fs.stat(file, function (err, stat) {
      if (err) {
        throw err; // can't pass err to cb
      }
      var result = stat.mtime > today;
      cb(result);
    });
  }

  // Output whether any file has been modified today.
  async.some(files, modifiedToday, function (result) {
    console.log(result);
  });
});
