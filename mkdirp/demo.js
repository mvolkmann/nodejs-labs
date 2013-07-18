'use strict';

// Do not run this directly!
// Instead run it with the script "run".
// That makes a copy of the target directory before deleting it
// and restores it when finished.

var fs = require('fs');
var mkdirp = require('mkdirp');

var dirPath = './target/foo/bar';
mkdirp(dirPath, function (err) {
  if (err) {
    console.error('mkdirp failed');
  } else {
    console.log('mkdirp succeeded');
    /*
    fs.readdir('.', function (err, files) {
      console.log('files remaining are', files);
    });
    */
  }
});
