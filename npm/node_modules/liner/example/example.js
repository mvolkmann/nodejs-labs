'use strict';
var liner = require('../lib/liner');

liner.fromPath('./story.txt', function (err, line) {
  if (err) {
    console.error(err);
  } else if (line === null) {
    console.log('EOF');
  } else {
    console.log(line);
  }
});
