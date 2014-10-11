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

// Keep the process alive for 15 seconds.
setTimeout(
  function () {
    console.log('uptime:', process.uptime());
  },
  15000);

// In another window, run "ps -p{pid}" to verify that
// the change to the process title worked.
