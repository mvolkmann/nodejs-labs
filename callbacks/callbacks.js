'use strict';
var fs = require('fs');

function readObject(filePath, cb) {
  fs.readFile(filePath, function (err, buf) {
    var obj = null;
    if (!err) {
      try {
        obj = JSON.parse(buf); // can throw
      } catch (e) {
        err = e;
      }
    }
    cb(err, obj);
  });
}

readObject('demo.json', function (err, obj) {
  if (err) {
    console.error(err);
  } else {
    console.log(obj);
  }
});
