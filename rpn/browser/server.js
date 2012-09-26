'use strict';
var rpn = require('../stdio-rpn');
var sio = require('socket.io');
var strata = require('strata');

var result;

// Configure Strata middleware.
strata.use(strata.file, 'public', 'index.html');

// Start Strata server.
var server = strata.run();

function broadcast(socket, topic, data) {
  socket.emit(topic, data.toString());
  socket.broadcast.emit(topic, data.toString());
}

// Setup Socket.IO.
var io = sio.listen(server);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  socket.on('update', function () {
    socket.emit('stack', rpn.stack.toString());
    if (result) {
      socket.emit('result', result.toString());
    }
  });

  socket.on('line', function (line) {
    try {
      result = rpn.evaluate(line, true);
    } catch (e) {
      result = e.message;
    }

    broadcast(socket, 'stack', rpn.stack);
    if (result) {
      broadcast(socket, 'result', result);
    }
  });
});
