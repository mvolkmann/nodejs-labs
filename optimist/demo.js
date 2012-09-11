#!/usr/bin/env node
// In UNIX systems, the previous line allows running the program
// like a script if the file is marked as executable.
// chmod a+x demo

var optimist = require('optimist');

// Provide a usage description.
// $0 is replaced by the script name.
optimist.usage('usage: $0 [options] word number');

// Provide default values for some options.
// A map of name/value pairs can be passed instead.
optimist.default('size', 'large');

// Cause boolean options to have a value of false
// instead of undefined if they are omitted.
// Cause showHelp to indicate which options are booleans.
// Allow boolean options to immediately precede
// command-line arguments without taking on their value.
optimist.boolean(['balloons', 'help']);

// Define aliases for some options.
// This is useful for supporting both long and short option names.
// It allows the code to check for one of the names.
// This can be called multiple times with a key and alias string
// instead of passing a map.
optimist.alias({
  balloons: 'b',
  color: 'c',
  help: 'h',
  size: 's'
});

// Provide descriptions that are output by showHelp method.
// This can be called multiple times with a key and alias string
// instead of passing a map.
optimist.describe({
  balloons: 'boolean option indicating whether you like balloons',
  color: 'your favorite color',
  size: 'your shirt size',
  help: 'outputs this help'
});

// Check arguments and/or command-line options for error conditions
// and stop processing if there is an unacceptable value.
optimist.check(function (argv) {
  if (argv.color === 'green') {
    throw 'I do not like that color!';
    // Can also return false instead of throwing,
    // but that will output this entire function
    // rather than provide a nice error message.
    //return false;
  }
});

// Specify the options that are required.
// If a number is passed, that specifies the number
// of command-line arguments that are required.
// Accessing argv must be chained to the demand call,
// but I don't know why.
var argv = optimist.demand(['color', 'size']).argv;

if (argv.help) {
  optimist.showHelp();
  process.exit(0);
}

// Example: ./demo -b --color red -s medium foo 19
// -b is a boolean option.  argv.b will be true or undefined.
// --color is a long option.
// -c is short option.
// foo and 19 are command-line arguments, not options.
console.log('balloons?', argv.balloons); // true
console.log('color =', argv.color); // 'red'
console.log('size =', argv.size); // 'medium'
console.log('args =', argv._); // ['foo', 19]
