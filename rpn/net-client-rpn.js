'use strict';

var net = require('net');

var socket = net.connect(1961);

// Cause 'data' callback to receive strings instead of Buffers.
socket.setEncoding('utf8');

socket.on('data', console.log);

socket.on('end', function () {
  console.log('server exited');
  process.exit(0);
});

socket.on('error', function (err) {
  var msg = err.code === 'ECONNREFUSED' ? 'server is not running' : err.toString();
  console.error(msg);
  process.exit(1);
});

process.stdin.on('data', function (buf) {
  var line = buf.toString().replace(/\s/g, '');
  socket.write(line);
});

process.stdin.resume();
