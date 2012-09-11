'use strict';

// This demonstrates that the emit function is synchronous.
// When emit is called, all registered listener functions
// are executed immediately.
// They are not added to the event loop queue.

var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();
ee.on('foo', function () {
  process.nextTick(function () {
    console.log('got foo event');
  });
});

function sync1() {
  console.log('sync1 entered');
  ee.emit('foo');
  console.log('sync1 exiting');
}

function sync2() {
  console.log('sync2 entered');
}

sync1();
sync2();
