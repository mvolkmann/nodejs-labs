// This demonstrates communicating with a SockJS server using a non-web client.
'use strict';
var sjsc = require('sockjs-client');

var DELIMITER = '/';

function log(msg) {
  var pair = msg.split(DELIMITER);
  var key = pair[0]; // not using
  var data = pair[1];
  console.log(data);
}

function write(key, data) {
  var msg = key + DELIMITER + data;
  client.write(msg);
}

var client = sjsc.create('http://localhost:1982/chat');

client.on('data', log);
client.on('error', log);

write('login', 'Mark');
write('message', 'Hello, World!');
