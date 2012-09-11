'use strict';
var Liner = require('index.js');

/*
liner.fromPath('../story.txt', function (err, line) {
  if (err) {
    console.error(err);
  } else if (line === null) {
    console.log('EOF');
  } else {
    console.log(line);
  }
});
*/

var liner = new Liner('story.txt');
liner.on('data', function (line) {
  console.log(line);
});
liner.on('err', function (err) {
  console.error(err);
});
liner.on('end', function () {
  process.exit(0);
});
