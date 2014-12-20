'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var addressbook = {}; // just storing data in memory
var app = express();
module.exports = app;

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(bodyParser.json());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static('public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

function getKey(obj) {
  return obj.lastName + ', ' + obj.firstName;
}

function add(obj) {
  var key = getKey(obj);
  addressbook[key] = obj;
}

// Deletes an existing entry.
function del(req, res) {
  var key = getKey(req.body);
  delete addressbook[key];
  res.send(200);
}

function edit(req, res) {
  res.render('edit', {
    title: 'Address Book',
    data: req.query
  });
}

function list(req, res) {
  var obj = req.query;
  if (Object.keys(obj).length) {
    // Performing a search
    var key = getKey(obj);
    obj = addressbook[key];
    res.status(obj ? 200 : 404);
    res.send(obj);
  } else {
    // An initial page request
    //console.log('rendering list with', addressbook);
    res.render('list', {
      title: 'Address Book',
      addressbook: addressbook
    });
  }
}

app.post('/addressbook/delete', del);
app.get('/addressbook/edit', edit);
app.get('/addressbook', list);
app.get('/addressbook/list', list);

// Saves a new entry.
app.post('/addressbook', function (req, res) {
  var obj = req.body;
  add(obj);
  res.send();
});

var person = {
  firstName: 'Mark',
  lastName: 'Volkmann',
  street: '644 Glen Summit',
  city: 'St. Charles',
  state: 'Missouri',
  zip: 63304
};
add(person);

app.listen(3000);
console.log('Express server listening on port %d in %s mode',
  app.address().port, app.settings.env);
