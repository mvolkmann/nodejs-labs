// This may be specific to npm and
// used by "npm init" to prompt for package.json information.
// This code does not work because the read module is only defined in npm!
'use strict';
// see /usr/local/n/versions/0.6.10/lib/node_modules/npm/node_modules/read
var read = require('read');

var opts = {
  prompt: 'Enter something: ',
  silent: false,
  num: 5,
  timeout: 1000,
  default: 'too slow'
};
read(opts, function (err, result) {
  console.log('You entered:', result);
});

