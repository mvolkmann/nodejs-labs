'use strict';
var math = require('../lib/math');

/*
exports.testStopOnFirstFail = function (t) {
  t.equal(1, 2);
  t.equal(2, 3); // evaluated even though the previous assert failed!
  t.done();
};
*/

exports.testSum = function (t) {
  t.equal(math.sum(3, 2, 6), 11, 'basic add');
  //t.ok(2 < 3, 'comparision');
  //t.fail(1, 2, 'msg', '>');
  t.done();
};

exports.testSumFile = function (t) {
  //console.log('t.ifError =', t.ifError);
  math.sumFile('numbers.txt', function (err, result) {
    //console.log('err =', err);
    //t.ifError(err); // NOT WORKING!
    //if (err) throw err;
    //console.log('after call to t.ifError');
    if (err) {
      t.fail(err);
    } else {
      t.equal(result, 24, 'basic add');
    }
    t.done();
  });
};

exports.testWithSetUpAndTearDown = {
  setUp: function (cb) {
    console.log('in setup');
    cb();
  },
  testSumWithZero: function (t) {
    t.equal(math.sum(0, 2), 2, 'zero on left');
    t.equal(math.sum(2, 0), 2, 'zero on right');
    t.done();
  },
  testSumWithNegative: function (t) {
    t.equal(math.sum(-2, 3), 1, 'negative and positive');
    t.equal(math.sum(-2, -3), -5, 'two negatives');
    t.done();
  },
  tearDown: function (cb) {
    console.log('in tearDown');
    cb();
  }
};
