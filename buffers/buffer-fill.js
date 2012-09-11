'use strict';

var buf = new Buffer(20);
//buf.fill('test');
buf.fill(65, 5, 10);
console.log(buf.toString());
