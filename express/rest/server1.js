'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var book = {}; // just storing data in memory

app.use(express.static(__dirname + '/public')); // serve static files
app.use(bodyParser()); // automatically convert JSON requests to objects

function del(req, res) {
  var id = req.params.id;
  if (book[id]) {
    delete book[id];
    res.send(200);
  } else {
    res.send(404);
  }
}

function get(req, res) {
  var id = req.params.id;
  var person = book[id];
  if (person) {
    res.set('Content-Type', 'application/json');
    res.send(200, JSON.stringify(person));
  } else {
    res.send(404);
  }
}

function list(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(200, JSON.stringify(Object.keys(book)));
}

function put(req, res) {
  var id = req.params.id;
  var person = req.body;
  book[id] = person;
  res.send(200);
}

app['delete']('/addressbook/:id', del);
app.get('/addressbook/list', list);
app.get('/addressbook/:id', get);
app.put('/addressbook/:id', put);

var PORT = 3000;
app.listen(PORT);
console.log('Express server listening on port', PORT);
