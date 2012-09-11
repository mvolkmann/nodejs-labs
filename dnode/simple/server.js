'use strict';

var dnode = require('dnode');
var PORT = 3000;

var server = dnode({
  add: function (n1, n2, cb) {
    cb(n1 + n2);
  }
  // can define more than one
});
server.listen(PORT);
