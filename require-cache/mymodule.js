'use strict';
console.log('mymodule was required');

function foo() {
  console.log('foo entered');
}

exports.foo = foo;
