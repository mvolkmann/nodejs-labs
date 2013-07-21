'use strict';
/*global SockJS: false, $: false */

function log(msg) {
  $('#log').prepend('<div>' + msg + '</div>');
}

$(document).ready(function () {
  var DELIMITER = '/';
  var sock = new SockJS('http://localhost:1982/chat');

  function send(key, data) {
    var msg = key + DELIMITER + data;
    sock.send(msg);
  }

  sock.onmessage = function (msg) {
    var pair = msg.data.split(DELIMITER);
    var key = pair[0]; // not using
    var data = pair[1];
    log(data);
  };

  $('#login').click(function () {
    send('login', $('#name').val());
  });

  $('#send').click(function () {
    send('message', $('#message').val());
  });
});
