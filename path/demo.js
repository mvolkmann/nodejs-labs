'use strict';
var fs = require('fs');
var path = require('path');

console.log(path.normalize('../fs/../console///demo.js'));

var dirs = ['../url', '../vm', '../zlib'];
var args = dirs.concat('demo.js');
console.log(path.resolve.apply(null, args));

var absPath = path.resolve('foo.txt');
//var absPath = __dirname + '/foo.txt'; // same as above
//console.log(absPath);
console.log(path.dirname(absPath));
var ext = path.extname(absPath);
console.log(path.basename(absPath, ext));
console.log(ext);

fs.exists(absPath, function (existsP) {
  console.log(absPath + ' exists? ' + existsP);
});
