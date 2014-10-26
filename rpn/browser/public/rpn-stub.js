var numberField, socket;

function enter() {
  // emit a 'line' event with numberField.val()
  numberField.val('');
  numberField.focus();
}

function operation(event) {
  var op = $(event.target).text();
  // emit a 'line' event to the socket with op
}

$(document).ready(function () {
  $('#enter').click(enter);

  numberField = $('#number');
  numberField.focus();
  numberField.keypress(function (event) {
    if (event.which === 13) enter();
  });

  $('add').click(operation);
  $('#subtract').click(operation);
  $('#multiply').click(operation);
  $('#divide').click(operation);

  socket = io.connect();

  // When a 'connect' event is received on the socket,
  // emit an 'update' event on the socket.

  // When a 'result' event is received on
  // the socket, update the result field with
  // $('#result').text(result);
  //
  // When a 'stack' event is received on the socket,
  // update the stack field with
  // $('#stack').text(stack);
});
