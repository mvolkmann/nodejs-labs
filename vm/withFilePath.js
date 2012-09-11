'use strict';
var vm = require('vm');

var code = "var x = 1;\n" +
  "throw new Error('boom')";
var filePath = '/foo/bar/baz.js';
//vm.runInThisContext(code, filePath);
//vm.runInNewContext(code, {}, filePath);
var context = vm.createContext();
vm.runInContext(code, context, filePath);
