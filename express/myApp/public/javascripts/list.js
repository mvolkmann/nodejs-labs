'use strict';

function getChecked() {
  
}

function add() {
  alert('got Add press');
}

function del() {
  alert('got Delete press');
}

function edit() {
  alert('got Edit press');
}

$(document).ready(function () {
  $('#addBtn').click(add);
  $('#deleteBtn').click(del);
  $('#editBtn').click(edit);
});
