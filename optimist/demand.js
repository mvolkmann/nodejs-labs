var optimist = require('optimist');
optimist.usage('usage: ./demand.js --foo [bar]');
optimist.demand(['foo']);
var argv = optimist.argv;
console.log('foo =', argv.foo);
