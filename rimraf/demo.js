'use strict';

// Do not run this directly!
// Instead run it with the script "run".
// That makes a copy of the target directory before deleting it
// and restores it when finished.

var fs = require('fs');
var rimraf = require('rimraf');

var dirPath = 'target';
rimraf(dirPath, function (err) {
  if (err) {
    console.error('rimraf failed');
  } else {
    console.log('rimraf succeeded');
    fs.readdir('.', function (err, files) {
      console.log('files remaining are', files);
    });
  }
});
