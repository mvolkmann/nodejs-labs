'use strict';
var buf = new Buffer(3);
buf.fill('a');
var value = buf.readInt32LE(0);
console.log('value =', value);
