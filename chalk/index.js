const chalk = require('chalk');

// process.argv holds command-line arguments.
// The first value is the path to the node executable.
// The second value is the path to the file being executed.
// The third value (at index 2) is the first command-line argument.
const name = process.argv[2];
console.log('Hello, ' + chalk.red.bgYellow.bold(name) + '!');
