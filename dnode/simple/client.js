'use strict';

var dnode = require('dnode');
var PORT = 3000;

var conn = dnode.connect(PORT);
conn.on('remote', function (remote) {
  remote.add(1, 3, function (result) {
    console.log(result); // 4
    conn.end();
  });
});

