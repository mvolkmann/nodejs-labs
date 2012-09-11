'use strict';
var async = require('async');
var fs = require('fs');
var rimraf = require('rimraf'); // https://github.com/isaacs/rimraf

var dirPath = 'foo';
var fileName = 'bar.txt';
var filePath = dirPath + '/' + fileName;
var content = 'some content';

var tasks = {
  rimraf: rimraf.bind(null, dirPath), // no requirements
  mkdir: ['rimraf', fs.mkdir.bind(null, dirPath)],
  // The next line doesn't work because fs.writeFile
  // uses the last argument as the callback and
  // async.auto passes cb and results to each task.
  //writeFile: ['mkdir', fs.writeFile.bind(null, filePath, content, 'utf8')],
  writeFile: ['mkdir', function (cb) {//, results) {
    fs.writeFile(filePath, content, cb);
  }],
  stat: ['writeFile', fs.stat.bind(null, filePath)]
};

async.auto(tasks, function (err, results) {
  if (err) {
    throw err;
  }
  console.log('size is ' + results.stat.size);
});
