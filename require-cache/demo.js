'use strict';
// This is working as expected if it outputs "mymodule was required" twice,
// not three times.

var mm = require('./mymodule'); // will load

var mm = require('./mymodule'); // won't load; in require.cache

var mmId = __dirname + '/mymodule.js';
delete require.cache[mmId];

var mm = require('./mymodule'); // will load
//mm.foo();
