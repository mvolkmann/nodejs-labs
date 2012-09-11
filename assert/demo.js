'use strict';
var assert = require('assert');
var fs = require('fs');

assert(1 < 2, 'math works');

var actual = [1, [2, 3], 4];
var expected = [1, [2, 3], 4];
assert.deepEqual(actual, expected);

assert.throws(
  function () {
    fs.readFileSync('/does/not/exist');
  },
  Error);

assert.doesNotThrow(
  fs.readFileSync.bind(null, 'demo.js'),
  Error);

console.log('calling fs.readFile');
fs.readFile('/does/not/exist', function (err, data) {
  assert.ifError(err);
  console.log('data =', data);
});

assert.fail(null, null, 'did not expect to be here');
