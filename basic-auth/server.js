'use strict';
var express = require('express');

var app = express();

app.use(express.static(__dirname));

var logouts = {};

function unauthorized(res) {
  res.statusCode = 401; // Unauthorized
  res.setHeader('WWW-Authenticate', 'Basic realm="my demo"');
  res.end();
}

app.get('/login', function (req, res) {
  var auth = req.headers.authorization;
  if (auth) {
    if (logouts[auth]) {
      delete logouts[auth];
      unauthorized(res);
    } else {
      console.log('auth =', auth);
      var plainText = new Buffer(auth.split(' ')[1], 'base64').toString();
      var parts = plainText.split(':');
      var username = parts[0];
      var password = parts[1];
      console.log('username =', username);
      console.log('password =', password);
      res.end(plainText);
    }
  } else {
    unauthorized(res);
  }
});

app.get('/logout', function (req, res) {
  var auth = req.headers.authorization;
  logouts[auth] = true;
  unauthorized(res);
});

var PORT = 3000;
app.listen(PORT);
console.log('browse http://localhost:' + PORT);
