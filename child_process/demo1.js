'use strict';
var child_process = require('child_process');

var cp = child_process.spawn('ls', ['-l', '..']);
//console.log('cp =', cp);
console.log('pid =', cp.pid);

cp.stdout.on('data', function (buf) {
  console.log(buf.toString());
});

cp.on('exit', function (code, signal) {
  console.log('exit code =', code);
  console.log('exit signal =', signal);
});
