'use strict';
var net = require('net');

var socket = net.connect(8019, function () {
  console.log('connected to server');
});

socket.write('Is this lost?');

socket.on('data', function (data) {
  console.log('received "' + data + '"');
  socket.write('goodbye');
  socket.end();
});

socket.on('end', function (data) {
  console.log('disconnected from server');
});
