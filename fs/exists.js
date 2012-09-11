'use strict';
var fs = require('fs');

var path1 = __dirname + '/foo.txt';
var path2 = __dirname + '/bar.txt';

fs.exists(path1, function (existsP) {
  console.log(path1 + ' exists? ' + existsP); // true
});

fs.exists(path2, function (existsP) {
  console.log(path2 + ' exists? ' + existsP); // false
});
