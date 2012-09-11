'use strict';
console.log('arch:', process.arch);
console.log('argv:', process.argv);
console.log('execPath:', process.execPath);
console.log('pid:', process.pid);
console.log('platform:', process.platform);
process.title = 'RockOn';
console.log('title:', process.title);
console.log('version:', process.version);
console.log('versions:', process.versions);
console.log('memory usage:', process.memoryUsage());

setTimeout(
  function () {
    console.log('uptime:', process.uptime());
  },
  5000);

/*
process.stdin.resume();
process.stdin.on('data', function (data) {
  // Just keeping the process alive.
});
*/

