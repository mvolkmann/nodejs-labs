'use strict';
/*global io: false, $: false */

function log(msg) {
  $('#log').prepend('<div>' + msg + '</div>');
}

$(document).ready(function () {
  var socket = io.connect();
  socket.on('message', log);

  $('#login').click(function () {
    socket.emit('login', $('#name').val(), log);
  });

  $('#send').click(function () {
    socket.emit('message', $('#message').val(), log);
  });
});
