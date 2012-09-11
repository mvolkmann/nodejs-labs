'use strict';

var demo = require('./build/Release/demo');

console.log(demo.greet('World'));
console.log(demo.sum(1, 3, 7));
console.log(demo.sumd(1.8, 3.7, 7.6));
console.log(demo.suma([1, 3, 7]));
console.log(demo.not(3 < 2));

var obj = {
  hungry: true,
  number: 19,
  pi: 3.14,
  color: 'yellow',
  now: new Date()
};
demo.dumpProps(obj);

function foo(err, result) {
  if (err) {
    console.log('foo: err =', err);
  } else {
    console.log('foo: result =', result);
  }
}

demo.takeFn(foo);
//demo.takeFn('wrong arg type');

//console.log(demo.greet(19, true));
