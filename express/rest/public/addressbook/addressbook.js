'use strict';
/*global $: false, io: false */

(function () {
  var emailInput, firstNameInput, lastNameInput, phoneInput;
  var deleteBtn, nameList;
  var URL_PREFIX = 'http://localhost:3000/addressbook/';

  function Person(firstName, lastName, email, phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  function add() {
    var id = getId();

    var doneCb = function () {
      insertId(id);
      nameList.val(getKey());
    };

    $.ajax(URL_PREFIX + id, {
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(makePerson())
    }).done(doneCb).error(failCb);
  }

  function addId(id) {
    var pieces = id.split('-');
    var key = pieces.join(', ');
    nameList.append($('<option>', {id: id}).text(key));
  }

  function clear() {
    firstNameInput.val('');
    lastNameInput.val('');
    emailInput.val('');
    phoneInput.val('');
  }
  
  function del() {
    var doneCb = function () {
      clear();
      deleteBtn[0].disabled = true;
    };

    var id = getId();
    $.ajax(URL_PREFIX + id, {type: 'DELETE'}).done(doneCb).error(failCb);
  }

  function failCb(err) {
    alert(err.toString());
    console.log('error:', err);
  }

  function getId() {
    return lastNameInput.val() + '-' + firstNameInput.val();
  }

  function getKey() {
    return lastNameInput.val() + ', ' + firstNameInput.val();
  }

  function insertId(id) {
    var pieces = id.split('-');
    var key = pieces.join(', ');

    var option = $('<option>', {id: id}).text(key);

    var added = false;
    nameList.children().each(function (index, op) {
      if (added) return;
      if (id === op.id) {
        added = true; // already exists
      } else if (id < op.id) {
        option.insertBefore(op);
        added = true;
      }
    });

    if (!added) nameList.append(option);
  }

  function load() {
    var doneCb = function (ids) {
      ids.sort().forEach(addId);
    };

    $.getJSON(URL_PREFIX + 'list').done(doneCb).fail(failCb);
  }

  function makePerson() {
    return new Person(
      firstNameInput.val(),
      lastNameInput.val(),
      emailInput.val(),
      phoneInput.val());
  }

  function select(event) {
    var option = $(event.target);
    // If the select element was selected instead of one of its options ...
    if (option.prop('tagName') !== 'OPTION') return;

    var id = option.attr('id');
    var key = option.text();

    var doneCb = function (person) {
      firstNameInput.val(person.firstName);
      lastNameInput.val(person.lastName);
      emailInput.val(person.email);
      phoneInput.val(person.phone);
      deleteBtn[0].disabled = false;
    };

    $.getJSON(URL_PREFIX + id).done(doneCb).fail(failCb);
  }

  function setupWebSocket() {
    var ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = function (event) {
      console.log('got WebSocket message "' + event.data + '"');
      if (!event.data) return;

      var obj = JSON.parse(event.data);
      console.log('received', JSON.stringify(obj));
      if (obj.event === 'put') {
        insertId(obj.id);
      } else if (obj.event === 'delete') {
        $('#' + obj.id).remove();
      } else {
        console.error('received unrecognized message "' + event.data + '"');
      }
    };
  }

  $(function () {
    firstNameInput = $('#firstName');
    lastNameInput = $('#lastName');
    emailInput = $('#email');
    phoneInput = $('#phone');
    nameList = $('#nameList');
    deleteBtn = $('#delete');

    setupWebSocket();
    load();

    $('#add').click(add);
    deleteBtn.click(del);
    nameList.click(select);
  });
}());
