'use strict';
var express = require('express');
var http = require('http');
var rpn = require('../stdio-rpn');
var sio = require('socket.io');

// Setup Express.
var app = express();
// Serve static files from the public directory.
app.use(express.static('public'));

function broadcast(socket, topic, data) {
  socket.emit(topic, data.toString());
  socket.broadcast.emit(topic, data.toString());
}

// Setup Socket.IO.
var server = http.Server(app);
var io = sio(server);
io.on('connection', function (socket) {
  var result;

  socket.on('update', function () {
    // Emit a 'stack' event to the current client.
    // If result has a value,
    // emit a 'result' event to the current client.
  });

  socket.on('line', function (line) {
    try {
      result = rpn.evaluate(line, true);
    } catch (e) {
      result = e.message;
    }

    // Emit a 'stack' event to all connected clients.
    // If result has a value,
    // emit a 'result' event to all connected clients.
  });
});

var PORT = 1961;
server.listen(PORT);
console.log('browse http://localhost:' + PORT);
