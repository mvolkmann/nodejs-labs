'use strict';
/*jshint evil: true */ // so TAGG eval method can be used

var tagg = require('threads_a_gogo');

var obj = {
  name: 'player1',
  score: 1
};

var thread = tagg.create();

/*
thread.load(__dirname + '/threadCode1.js'); // synchronous!
thread.eval("hello('Mark')", function (err, result) {
  console.log('result =', result);
});
console.log('called eval');
thread.emit('incrRequest', JSON.stringify(obj));

thread.on('incrResponse', function (obj) {
  console.log('response obj =', obj);
  this.destroy();
});

console.log('evaling thread');
*/

// Don't seem to get an error when path is relative,
// but it doesn't work.
thread.load(__dirname + '/threadCode1NotFound.js', function (err) {
  console.log('err =', err);

  thread.eval("hello('Mark')");
  thread.eval("5 / 2", function (err, result) {
    console.log('result =', result);
  });
  thread.eval("JSON.parse('bad#json')", function (err, result) {
    console.log('err =', err);
  });

  thread.emit('incrRequest', JSON.stringify(obj));

  thread.on('incrResponse', function (obj) {
    console.log('response obj =', obj);
    this.destroy();
  });

  console.log('evaling thread');
});

process.on('uncaughtException', function (err) {
  console.log('uncaughtException:', err);
});
