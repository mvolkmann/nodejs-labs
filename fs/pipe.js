'use strict';
var fs = require('fs');
var Stream = require('stream');

var rs = fs.createReadStream('TaleOfTwoCities.txt');
console.log('rs is a', rs.constructor.name);
console.log('an fs.ReadStream?', rs instanceof fs.ReadStream);
console.log('a Stream?', rs instanceof Stream);
rs.pipe(process.stdout);
