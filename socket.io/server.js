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
  socket.on('login', function (name, cb) {
    socket.name = name;
    cb('Welcome ' + name + '!');
  });

  socket.on('message', function (msg, cb) {
    if (socket.name) {
      socket.broadcast.emit('message', socket.name + ': ' + msg);
      cb('received "' + msg + '"');
    } else {
      cb('must login first');
    }
  });
});
