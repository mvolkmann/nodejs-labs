'use strict';
var bar = require('./bar');
var vm = require('vm');

function foo(box) {
  console.log('in foo, userId =', box.userId);
  //bar();
}

var code = "console.log('in code, userId =', userId); foo()";
var sandbox = {
  console: console,
  userId: 'mvolkmann'
};
sandbox.foo = foo.bind(null, sandbox);

/*
Object.keys(sandbox).forEach(function (key) {
  global[key] = sandbox[key];
});
*/

var context = vm.createContext(sandbox);
vm.runInContext(code, context);
