'use strict';
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello!');
});

var PORT = 1919;
app.listen(PORT);
console.log('browse http://localhost:' + PORT);
