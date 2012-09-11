'use strict';
var dgram = require('dgram');

var type = 'udp4'; // or 'udp6'
var client = dgram.createSocket('udp4');

client.on('message', function (msg, rinfo) {
  console.log('got "' + msg + '" from ' +
    rinfo.address + ':' + rinfo.port);
  client.close();
});

client.on('error', function (err) {
  console.error(err);
});

client.on('listening', function () {
  var addr = client.address();
  console.log('listening on ' + addr.address + ':' + addr.port);
});

var msg = new Buffer('ping');
var HOST = 'localhost';
var PORT = 1234;
// Waits forever if server isn't running!
client.send(msg, 0, msg.length, PORT, HOST, function (err, bytes) {
  console.log('bytes sent: ', bytes);
});
