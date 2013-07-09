'use strict';
var Liner = require('liner');
var liner = new Liner('./story.txt');

liner.on('readable', function () {
  while (true) {
    var line = liner.read();
    if (line === null) break;
    console.log(line);
  }
});

liner.on('error', console.error);
