'use strict';
var assert = require('assert');
var vm = require('vm');

var code = "Math.pow(x, y)";
var sandbox = {x: 2, y: 3};
var context = vm.createContext(sandbox);

assert.equal(vm.runInNewContext(code, sandbox), 8);
assert.equal(vm.runInContext(code, context), 8);
