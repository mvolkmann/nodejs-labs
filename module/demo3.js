'use strict';
var demo2 = require('./demo2');

console.log('demo3.js entered');
console.log('demo3 loaded =', module.loaded);

function baz() {
  console.log('\nbaz entered');
  console.log('demo3 loaded =', module.loaded);
  console.log('demo2 filename =', module.filename);
  console.log('demo3 parent.filename =', (module.parent ? module.parent.filename : null));
  console.log('demo3 children =', module.children);
  demo2.bar();

}

exports.baz = baz;

if (require.main === module) {
  console.log('demo3.js is main');
  baz();
}
