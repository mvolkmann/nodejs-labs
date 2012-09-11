'use strict';

var _ = require('underscore');

function Person(name, color) {
  this.name = name;
  this.color = color;
}

Person.prototype.getName = function () {
  return this ? this.name : 'unbound';
};

Person.prototype.getColor = function () {
  return this ? this.color : 'unbound';
};

var me = new Person('Mark', 'yellow');

var fn1 = me.getName;
console.log(fn1()); // 'unbound'

console.log(fn1.call(me)); // 'Mark'

_.bindAll(me);
var fn2 = me.getName;
console.log(fn2()); // 'Mark'
var fn3 = me.getColor;
console.log(fn3()); // 'color'
