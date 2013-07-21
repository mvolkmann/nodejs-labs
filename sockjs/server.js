'use strict';
var sockjs = require('sockjs');
var strata = require('strata');

var DELIMITER = '/';
var connMap = {};

function broadcast(fromConn, key, data) {
  var msg = key + DELIMITER + data;
  Object.keys(connMap).forEach(function (id) {
    var conn = connMap[id];
    if (conn.id !== fromConn.id) conn.write(msg);
  });
}

function write(toConn, key, data) {
  var msg = key + DELIMITER + data;
  toConn.write(msg);
}

var opts = {sockjs_url: 'http://cdn.sockjs.org/sockjs-0.3.min.js'};
var sockServer = sockjs.createServer(opts);
sockServer.on('connection', function (conn) {
  connMap[conn.id] = conn;

  conn.on('data', function (msg) {
    var pair = msg.split(DELIMITER);
    var key = pair[0];
    var data = pair[1];

    if (key === 'login') {
      conn.name = data;
      write(conn, 'message', 'Welcome ' + conn.name + '!');
    } else if (key === 'message') {
      if (conn.name) {
        broadcast(conn, 'message', conn.name + ': ' + data);
        write(conn, 'message', 'sent "' + data + '"');
      } else {
        write(conn, 'message', 'must login first');
      }
    } else {
      write(conn, 'message', 'unsupported message: ' + msg);
    }
  });

  conn.on('close', function () {
    delete connMap[conn.id];
    console.log('closed connection', conn.id);
  });
});

// Configure Strata static file serving middleware.
strata.use(strata.file, 'public', 'index.html');

// Start Strata server.
var server = strata.run();

// Associate SockJS with Strata server.
sockServer.installHandlers(server, {prefix: '/chat'});
