'use strict';
var express = require('express');
var http = require('http');
var rpn = require('../stdio-rpn');
var sio = require('socket.io');

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
//io.set('log level', 1);
io.on('connection', function (socket) {
  var result;

  socket.on('update', function () {
    socket.emit('stack', rpn.stack.toString());
    if (result) socket.emit('result', result.toString());
  });

  socket.on('line', function (line) {
    try {
      result = rpn.evaluate(line, true);
    } catch (e) {
      result = e.message;
    }

    broadcast(socket, 'stack', rpn.stack);
    if (result) broadcast(socket, 'result', result);
  });
});

var PORT = 1961;
server.listen(PORT);
console.log('browse http://localhost:' + PORT);
