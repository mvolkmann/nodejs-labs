'use strict';
var sio = require('socket.io');
var strata = require('strata');

// Configure Strata middleware.
strata.use(strata.file, 'public', 'index.html');

// Start Strata server.
var server = strata.run();

// Setup Socket.IO.
var io = sio.listen(server);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  socket.on('login', function (name) {
    socket.name = name;
    socket.emit('message', 'Welcome ' + name + '!');
  });

  socket.on('message', function (msg) {
    if (socket.name) {
      socket.broadcast.emit('message', socket.name + ': ' + msg);
      socket.emit('message', 'message received');
    } else {
      socket.emit('message', 'must login first');
    }
  });
});
