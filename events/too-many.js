'use strict';

var count = 11;
try {
  for (var i = 0; i < count; i++) {
    process.on('exit', function () {
      console.log('Goodbye!');
    });
  }
} catch (e) {
  console.log('caught error');
}

var listeners = process.listeners('exit');
console.log('listener isArray?', Array.isArray(listeners));
console.log('listener.length =', listeners.length);

listeners.push(function () {
  console.log('added in weird way');
});
