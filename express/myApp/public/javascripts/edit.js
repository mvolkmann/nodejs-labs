'use strict';

var inputIds = ['firstName', 'lastName', 'street', 'city', 'state', 'zip'];
var nonKeyIds = ['street', 'city', 'state', 'zip'];
var deleteButton, saveButton, searchButton;
var firstNameInput, lastNameInput;

function clearAll() {
  inputIds.forEach(function (id) {
    $('#' + id).val('');
  });
}

function clearNonKey() {
  nonKeyIds.forEach(function (id) {
    $('#' + id).val('');
  });
}

function setEnabled(element, enabled) {
  if (enabled) {
    element.removeAttr('disabled');
  } else {
    element.attr('disabled', 'disabled');
  }
}

function enableButtons() {
  var firstName = firstNameInput.val();
  var lastName = lastNameInput.val();
  var haveKey = firstName && lastName;
  setEnabled(saveButton, haveKey);
  setEnabled(searchButton, haveKey);
  setEnabled(deleteButton, haveKey);
}

function getData() {
  var data = {};
  inputIds.forEach(function (id) {
    data[id] = $('#' + id).val();
  });
  return data;
}

function setData(data) {
  inputIds.forEach(function (id) {
    $('#' + id).val(data[id]);
  });
}

function del() {
  var data = getData();
  // Using POST instead of DELETE because
  // some browsers don't support sending DELETE requests.
  $.post('/addressbook/delete', data, function (textStatus) {
    if (textStatus === 'OK') {
      clearAll();
    }
  });
}

function save() {
  var data = getData();
  $.post('/addressbook', data, function (data, textStatus) {
    clearNonKey();
    alert('Saved entry');
  });
}

function search() {
  var data = {};
  data.firstName = $('#firstName').val();
  data.lastName = $('#lastName').val();
  $.get('/addressbook', data, function (data) {
    if (data) {
      setData(data);
    } else {
      alert('Not found');
    }
  });
}

$(document).ready(function () {
  saveButton = $('#save');
  searchButton = $('#search');
  deleteButton = $('#delete');
  firstNameInput = $('#firstName');
  lastNameInput = $('#lastName');

  firstNameInput.keyup(enableButtons);
  lastNameInput.keyup(enableButtons);

  saveButton.click(save);
  searchButton.click(search);
  deleteButton.click(del);

  configureButtons();
});
