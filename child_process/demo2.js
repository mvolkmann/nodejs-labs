'use strict';
var child_process = require('child_process');

var file = __dirname + '/myFind.sh';
var args = ['js', 'require('];
var opts = {cwd: '..'};
// If you get "Error: maxBuffer exceeded, add the option maxBuffer: n
// where n is bigger than the number of characters returned by myFind.sh.
opts.maxBuffer = 600 * 1024;

var cp = child_process.execFile(file, args, opts,
  function (err, stdout, stderr) {

  if (err) {
    return console.error(err);
  }

  // The ? after * makes it a non-greedy match so it stops at the first ' or ".
  var re = /require\(['"](.*?)['"]\)/;
  var requires = {}; // will hold unique modules
  stdout.split('\n').forEach(function (line) {
    var matches = re.exec(line);
    if (matches) requires[matches[1]] = true;
  });

  Object.keys(requires).sort().forEach(function (req) {
    console.log(req);
  });
});
