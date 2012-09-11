'use strict';
var dgram = require('dgram');

var type = 'udp4'; // or 'udp6'
var server = dgram.createSocket(type);

server.on('message', function (msg, rinfo) {
  console.log('got "' + msg + '" from ' +
    rinfo.address + ':' + rinfo.port);

  msg = new Buffer('pong');
  server.send(msg, 0, msg.length, rinfo.port, rinfo.address, function (err, bytes) {
    console.log('bytes sent: ', bytes);
    server.close();
  });
});

server.on('error', function (err) {
  console.error(err);
});

server.on('listening', function () {
  var addr = server.address();
  console.log('listening on ' + addr.address + ':' + addr.port);
});

var PORT = 1234;
server.bind(PORT);
