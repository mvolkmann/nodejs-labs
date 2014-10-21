'use strict';

var evaluate = require('./stdio-rpn').evaluate;
var net = require('net');

var server = net.createServer(function (socket) {
  var result;

  // Cause 'data' callback to receive strings instead of Buffers.
  socket.setEncoding('utf8');

  socket.on('data', function (line) {
    try {
      result = evaluate(line, true);
    } catch (e) {
      result = e.message;
    }

    if (result) {
      socket.write(result.toString());
    }
  });

  /*
  socket.on('error', function (err) {
    console.log('server got error event, err =', err);
  });
  */
});

server.listen(1961, function () {
  console.log('server listening on port', server.address().port);
});
