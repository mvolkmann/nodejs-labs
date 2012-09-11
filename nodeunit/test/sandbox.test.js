'use strict';
var sandbox = require('nodeunit').utils.sandbox;

var boxModule = {exports: {}};
var boxGlobals = {
  module: boxModule,
  exports: boxModule.exports,
  require: require
};
var box = sandbox('../lib/math.js', boxGlobals);

exports.testIsComment = function (t) {
  t.ok(box.isComment('// foo'));
  t.ok(!box.isComment('foo'));
  t.done();
};
