'use strict';
var rl = require('readline');

// Generate a random number between 1 and 10.
var answer = Math.floor(Math.random() * 10) + 1;
console.log('A number between 1 and 10 has been selected.');

var intf = rl.createInterface(process.stdin, process.stdout);

function prompt(msg) {
  intf.setPrompt(msg);
  intf.prompt();
}

intf.on('line', function (line) {
  var number = parseInt(line, 10);
  if (isNaN(number)) {
    prompt('Enter a number: ');
  } else if (number < answer) {
    prompt('Too low: ');
  } else if (number > answer) {
    prompt('Too high: ');
  } else {
    console.log('CORRECT!');

    // Allow program to terminate.
    intf.close();
    process.stdin.destroy();
  }
});

prompt('Guess the number: ');
