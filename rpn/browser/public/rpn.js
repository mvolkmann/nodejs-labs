'use strict';
/*global io: false */

var numberField;
var socket;

function enter() {
  socket.emit('line', numberField.val());
  numberField.val('');
  numberField.focus();
}

function operation(event) {
  var op = $(event.target).text();
  socket.emit('line', op);
}

$(document).ready(function () {
  $('#enter').click(enter);

  numberField = $('#number');
  numberField.focus();
  numberField.keypress(function (event) {
    if (event.which === 13) {
      enter();
    }
  });

  $('#add').click(operation);
  $('#subtract').click(operation);
  $('#multiply').click(operation);
  $('#divide').click(operation);

  socket = io.connect();

  socket.on('connect', function () {
    socket.emit('update');
  });

  socket.on('result', function (result) {
    $('#result').text(result);
  });

  socket.on('stack', function (stack) {
    $('#stack').text(stack);
  });
});
