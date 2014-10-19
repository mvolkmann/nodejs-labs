'use strict';
var Liner = require('liner');
var liner = new Liner('./story.txt');

liner.on('data', function (line) {
  console.log(line);
});

liner.on('error', console.error);
