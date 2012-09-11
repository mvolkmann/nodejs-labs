'use strict';
console.log('demo1.js entered');
console.log('demo1 loaded =', module.loaded);

console.log('demo1 __dirname =', __dirname);
console.log('demo1 __filename =', __filename);
Object.keys(require).forEach(function (key) {
  var value = require[key];
  console.log('require.' + key + ' = ' + value);
});

function foo() {
  console.log('\nfoo entered');
  console.log('demo1 loaded =', module.loaded);
  console.log('demo2 filename =', module.filename);
  console.log('demo1 parent.filename =', (module.parent ? module.parent.filename : null));
  console.log('demo1 children =', module.children);
}

exports.foo = foo;

if (require.main === module) {
  console.log('demo1.js is main');
}
