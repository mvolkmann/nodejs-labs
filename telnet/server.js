'use strict';

var net = require('net');

var server = net.createServer(function (conn) {
  console.log('got a connection');
});

server.listen(3000, function () {
  console.log('server is listening on 3000');
});
