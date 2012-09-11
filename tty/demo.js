'use strict';

process.stdin.resume(); // must do before entering raw mode
process.stdin.setRawMode(true); // data events aren't emitted without this
process.stdin.setEncoding('utf8'); // char isn't passed to callback below without this

process.stdin.on('data', function (char) {
  var code = char.charCodeAt(0);
  console.log('char =', char, ', code =', code);
  if (code === 3) {
    console.log('graceful exit');
    process.exit();
  }
});
