'use strict';
/*global io: false */

function log(msg) {
  $('#log').prepend('<div class="log">' + msg + '</div>');
}

$(document).ready(function () {
  var socket = io.connect('http://localhost:1982');
  socket.on('message', log);

  $('#login').click(function () {
    socket.emit('login', $('#name').val());
  });

  $('#send').click(function () {
    socket.emit('message', $('#message').val());
  });
});
