// This demonstrates communicating with a Socket.IO server using a non-web client.
'use strict';
var io = require('socket.io-client');

function log(msg) {
  console.log(msg);
}

var socket = io.connect('http://localhost:1982');
socket.on('message', log);

socket.emit('login', 'Mark', log);
socket.emit('message', 'Hello, World!', log);
