'use strict';

var loggedIn = false, loginBtn, msg;

function login() {
  var url = 'http://localhost:3000/login';
  send(url, function (text) {
    loggedIn = true;
    loginBtn.innerText = 'Logout';
    msg.textContent = 'You are logged in as ' + text + '.';
  });
}

function logout() {
  var url = 'http://forget:forget@localhost:3000/logout';
  send(url, function () {
    loggedIn = false;
    loginBtn.innerText = 'Login';
    msg.textContent = 'You are logged out.';
  });
}

function send(url, handler) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true); // true for async
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) handler(xhr.responseText);
  };
  xhr.send();
}

window.onload = function () {
  loginBtn = document.getElementById('login');
  msg = document.getElementById('msg');

  document.getElementById('login').onclick = function () {
    (loggedIn ? logout : login)();
  };
};
