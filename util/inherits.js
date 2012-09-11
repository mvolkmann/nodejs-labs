'use strict';

var util = require('util');

function MySuper() {}

MySuper.prototype.foo = function () {
  console.log('MySuper foo entered');
};

MySuper.prototype.bar = function () {
};

function MySub() {
  MySuper.call(this);
}

util.inherits(MySub, MySuper);

MySub.prototype.foo = function () {
  MySub.super_.prototype.foo();
  console.log('MySub foo entered');
};

var sub = new MySub();
sub.foo();

//console.log(util.inspect(MySub.prototype, true));
//console.log(util.inspect(MySuper.prototype, true));
console.log('sub ctor name:', sub.constructor.name);
console.log('sub ctor proto name:', sub.constructor.prototype.name);
console.log('sub ctor proto ctor name:', sub.constructor.prototype.constructor.name);
