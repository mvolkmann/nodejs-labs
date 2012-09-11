'use strict';

var buf = new Buffer(100);

buf.writeUInt16BE(12345, 0);
buf.writeFloatLE(Math.PI, 2);

var number = buf.readUInt16BE(0);
console.log('number =', number);
var pi = buf.readFloatLE(2);
console.log('pi =', pi);

console.log('type is ' + number.constructor.name);
