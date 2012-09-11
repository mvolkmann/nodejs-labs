'use strict'
var assert = require('chai').assert;
var fileutil = require('./fileutil');

test('countChar', function (done) {
  fileutil.countChar('story.txt', 'g',
    function (err, count) {
      assert.isNull(err);
      assert.equal(count, 7);
      done(err);
    });
});
