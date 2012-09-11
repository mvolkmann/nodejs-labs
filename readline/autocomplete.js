'use strict';
var rl = require('readline');

var fruits = ('apple banana blackberry blueberry cherry grape grapefruit ' +
  'lemon lime orange peach pear plum strawberry').split(' ');

function completer(partial) { // synchronous
//function completer(partial, cb) { // asynchronous
  var options = fruits.filter(function (word) {
    return word.indexOf(partial) === 0;
  });
  return [options, partial]; // synchronous
  //cb(null, [options, partial]); // asynchronous
}

console.log('Enter names of fruits.');
console.log('Press tab for completion.');
console.log('To exit, enter "exit" or press ctrl-c or ctrl-d.');

var intf = rl.createInterface(process.stdin, process.stdout, completer);
intf.setPrompt('fruit: ');
intf.prompt();

intf.on('line', function (line) {
  if (line === 'exit') {
    intf.close();
    process.stdin.destroy(); // allows program to terminate
  } else {
    console.log('got ' + line);
    intf.prompt();
    //intf.write('ba');
  }
});
