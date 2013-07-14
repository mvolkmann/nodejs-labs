'use strict';
var child_process = require('child_process');

var args = ['js', 'require('];
var opts = {cwd: '..'};
var file = 'child_process/myFind.sh';
var cp = child_process.execFile(file, args, opts, function (err, data) {
  if (err) {
    return console.error(err);
  }

  console.log(data);

  /*
  var re = /require\(['"](.*)['"]\)/;
  var requires = {}; // will hold unique modules
  data.split('\n').forEach(function (line) {
    var matches = re.exec(line);
    if (matches) {
      requires[matches[1]] = true;
    }
  });

  Object.keys(requires).sort().forEach(function (req) {
    console.log(req);
  });
  */
});
