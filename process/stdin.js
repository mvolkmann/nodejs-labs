'use strict';

function prompt() {
  process.stdout.write('Enter something: ');
}

prompt();

process.stdin.on('data', function (data) {
  process.stdout.write('You entered: ' + data);
  prompt();
});

// Press ctrl-d to get this.
process.stdin.on('end', function () {
  process.stdout.write('\nGoodbye!\n');
  //console.log('\nGoodbye!'); // same
});

process.stdin.resume();
