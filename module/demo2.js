'use strict';
var demo1 = require('./demo1');

console.log('demo2.js entered');
console.log('demo2 loaded =', module.loaded);

function bar() {
  console.log('\nbar entered');
  console.log('demo2 loaded =', module.loaded);
  console.log('demo2 filename =', module.filename);
  console.log('demo2 parent.filename =', (module.parent ? module.parent.filename : null));
  console.log('demo2 children =', module.children);
  demo1.foo();
}

exports.bar = bar;

if (require.main === module) {
  console.log('demo2.js is main');
}
