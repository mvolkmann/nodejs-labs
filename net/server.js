'use strict';
var net = require('net');
var PORT = 8019;

var server = net.createServer(function (socket) {
  console.log('client connected');

  socket.on('data', function (data) {
    console.log('received "' + data + '"');
  });

  socket.on('end', function () {
    console.log('client disconnected');
    // Most servers wouldn't close just because a client ended.
    //server.close();
  });

  socket.write('hello');
});

server.on('error', function (err) {
  console.error(err.code === 'EADDRINUSE' ?
    'port ' + PORT + ' is already in use' : err);
});

server.listen(PORT, function () {
  console.log('listening on ' + PORT);
  console.log('address =', server.address());
});
