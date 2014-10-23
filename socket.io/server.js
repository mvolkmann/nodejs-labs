'use strict';
var express = require('express');
var http = require('http');
var sio = require('socket.io');

// Setup Express.
var app = express();
// Serve static files from the public directory.
app.use(express.static('public'));

// Setup Socket.IO.
var server = http.Server(app);
var io = sio(server);
io.on('connection', function (socket) {
  socket.on('login', function (name, cb) {
    socket.name = name;
    cb('Welcome ' + name + '!'); // sends message back to emitter
  });

  socket.on('message', function (msg, cb) {
    if (socket.name) {
      socket.broadcast.emit('message', socket.name + ': ' + msg);
      cb('received "' + msg + '"'); // sends acknowledgement back to emitter
    } else {
      cb('must login first'); // sends message back to emitter
    }
  });
});

var PORT = 1961;
server.listen(PORT);
console.log('browse http://localhost:' + PORT);
