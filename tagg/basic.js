'use strict';
/*jshint evil: true */ // so TAGG eval method can be used

var tagg = require('threads_a_gogo');

function addOne(n) {
  return n + 1;
}

var thread = tagg.create();

thread.eval(addOne);

thread.eval('addOne(2)', function (err, result) {
  console.log('result =', result);
  //console.log('same =', this === thread);
  // this === thread here
  this.destroy();
});

console.log('evaling thread');
