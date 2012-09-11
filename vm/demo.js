/*jshint evil: true */
'use strict';
var assert = require('assert');
var vm = require('vm');

function dump(msg, obj) {
  console.log(msg);
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log('  own ' + prop + ' = ' + obj[prop]);
    } else {
      console.log('  not own ' + prop + ' = ' + obj[prop]);
    }
  }
}

/*
var localVar = 123;

//var code = 'console.log(__filename);'; // __filename is not defined in the context
var code = 'localVar = 1;';

var inContext = vm.runInThisContext(code, 'myfile.vm');
console.log('localVar=' + localVar + ', inContext=' + inContext);
var evaled = eval(code);
console.log('localVar=' + localVar + ', evaled=' + evaled);
*/

var code = "Math.pow(x, y)";
var code2 = "console.log('z =', z); " + code;

//console.log('global =', global); // has lots of variables and functions
global.x = 3;
global.y = 2;
global.z = 19;
// Note how global functions (in this case just console)
// are explicitly being made available in the sandbox and context.
var sandbox = {x: 2, y: 3, z: 19, console: console};
var context = vm.createContext({x: 2, y: 4, z: 19, console: console});
dump('context =', context);

assert.equal(vm.runInThisContext(code), 9, 'vm.runInThisContext');
assert.equal(vm.runInNewContext(code2, sandbox), 8, 'vm.runInNewContext');
assert.equal(vm.runInContext(code2, context), 16, 'vm.runInContext');

var script = vm.createScript(code);
assert.equal(script.runInThisContext(), 9, 'script.runInThisContext');
assert.equal(script.runInNewContext(sandbox), 8, 'script.runInNewContext');
assert.equal(script.runInContext(context), 16, 'script.runInContext');
