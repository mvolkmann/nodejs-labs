'use strict';

var obj = {
  name: 'Mark',
  address: {
    street: '644 Glen Summit',
    city: 'St. Charles',
    state: 'Missouri',
    zip: 63304
  }
}

console.time('some label');
console.dir(obj);
console.log(obj);
console.timeEnd('some label');
//console.trace();
console.assert(1 === 2, 'numbers compare');
