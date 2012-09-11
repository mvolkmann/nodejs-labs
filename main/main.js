'use strict';

console.log('require.main =', require.main);

if (require.main === module) {
  console.log('run directly');
}
