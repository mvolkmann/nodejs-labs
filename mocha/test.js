'use strict';
/*global after: false, afterEach: false, before: false,
  beforeEach: false, suite: false, test: false */

var assert = require('chai').assert;

suite('demo');
before(function () {
  console.log('before suite');
});
beforeEach(function () {
  console.log('before test');
});
afterEach(function () {
  console.log('after test');
});
after(function () {
  console.log('after suite');
});

test('first', function () {
  console.log('first test entered');
  assert.isDefined(1);
  assert.isDefined('text');
  assert.isDefined(null);
  assert.isNotNull(undefined);
  assert.include([1, 2, 3], 2);
  assert.include('text', 'x');
  assert.match('foobar', /^fo\w*ar$/);
  assert.lengthOf([1, 2, 3], 3);
  assert.lengthOf('foo', 3);
  assert.throws(
    function () {
      JSON.parse('bad json');
    },
    SyntaxError);
  assert.throws(
    function () {
      JSON.parse('bad json');
    },
    'Unexpected token');
  assert.operator(1, '<', 2);
});

function Person(name) {
  this.name = name;
}

function Student(name) {
  Person.call(this, name);
}
Student.prototype = new Person();
Student.prototype.constructor = Student;

test('second', function () {
  console.log('second test entered');
  var s = new Student('Mark');
  assert.typeOf(s, 'object');
  assert.instanceOf(s, Person);
  assert.instanceOf(s, Student);
});
