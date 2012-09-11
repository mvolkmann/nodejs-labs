'use strict';

console.log('global:', global);
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);
process.chdir('..');
console.log('__dirname:', __dirname);
console.log('cwd:', process.cwd());
