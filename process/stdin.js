'use strict';

function prompt() {
  process.stdout.write('Enter something: ');
}

prompt();

process.stdin.on('data', function (data) {
  process.stdout.write('You entered: ' + data);
  prompt();
});

process.stdin.on('end', function () {
  process.stdout.write('\nGoodbye!\n');
  //console.log('Goodbye!');
});

process.stdin.resume();
//process.stdin.setEncoding('utf8');
