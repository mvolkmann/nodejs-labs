'use strict';

var _ = require('underscore');

var family = [];
family.push({
  name: 'Mark',
  age: 51
});
family.push({
  name: 'Tami',
  age: 50
});
family.push({
  name: 'Amanda',
  age: 26
});
family.push({
  name: 'Jeremy',
  age: 24
});

console.log(_.pluck(family, 'name'));
