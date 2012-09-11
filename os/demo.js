'use strict';
var os = require('os');

console.log('arch =', os.arch());
console.log('hostname =', os.hostname());
console.log('loadavg =', os.loadavg()); // 1, 5 and 15 minute load averages (percentages?)
console.log('platform =', os.platform());
console.log('release =', os.release());
console.log('type =', os.type());
console.log('uptime =', os.uptime(), 'seconds');

console.log('\nfreemem =', os.freemem(), 'bytes');
console.log('totalmem =', os.totalmem(), 'bytes');
var pctFree = os.freemem() / os.totalmem() * 100;
console.log('% free =', pctFree.toFixed(2) + '%');

// Returns object where keys are interface names and
// values are arrays of JSON objects, 1 per address for the interface,
// that have address, family and internal properties.
console.log('\nnetworkInterfaces =', os.networkInterfaces());

// Returns array of objects, 1 per CPU,
// that have model, speed (in MHz) and times
// (# of CPU ticks spent in user, nice, sys, idle and irq) properties.
console.log('\ncpus =', os.cpus());
