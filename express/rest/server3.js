'use strict';

function getDatabase() {
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/demoDb', function (err, db) {
    if (err) {
      console.error('failed to connect to database:', err);
    } else {
      getCollection(db);
    }
  });
}

function getCollection(db) {
  db.collection('addressbook', function (err, collection) {
    if (err) {
      console.error('failed to get collection:', err);
    } else {
      setupServer(collection);
    }
  });
}

function setupServer(collection) {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname + '/public')); // serve static files
  app.use(express.bodyParser()); // convert JSON requests to objects

  var wsArray = [];
  setupWebSocket(app);

  function broadcast(event, id) {
    var obj = {event: event, id: id};
    var msg = JSON.stringify(obj);

    wsArray.forEach(function (ws, index) {
      ws.send(msg, function (err) {
        if (err) wsArray[index] = null; // stop sending to this ws
      });
    });

    // Remove nulls from array.
    wsArray = wsArray.filter(function (ws) { return ws; });
  }

  function getMongoQuery(req) {
    var id = req.params.id;
    var pieces = id.split('-');
    return {lastName: pieces[0], firstName: pieces[1]};
  }

  function del(req, res) {
    collection.remove(getMongoQuery(req), function (err) {
      res.send(err ? 500 : 200, err);
      broadcast('delete', req.params.id);
    });
  }

  function get(req, res) {
    var cursor = collection.findOne(getMongoQuery(req), function (err, person) {
      if (err) {
        res.send(500, err);
      } else if (person) {
        res.set('Content-Type', 'application/json');
        res.send(200, JSON.stringify(person));
      } else {
        res.send(404);
      }
    });
  }

  function list(req, res) {
    collection.find().toArray(function (err, persons) {
      if (err) {
        res.send(500, err);
      } else {
        var ids = persons.map(function (person) {
          return person.lastName + '-' + person.firstName;
        });
        res.set('Content-Type', 'application/json');
        res.send(200, JSON.stringify(ids));
      }
    });
  }

  function put(req, res) {
    var person = req.body;
    var options = {upsert: true}; // insert if not present
    collection.update(getMongoQuery(req), person, options, function (err) {
      res.send(err ? 500 : 200, err);
      broadcast('put', req.params.id);
    });
  }

  function setupWebSocket(app) {
    var WebSocketServer = require('ws').Server;
    var http = require('http');
    var server = http.createServer(app);
    var wss = new WebSocketServer({server: server});
    wss.on('connection', function (ws) {
      wsArray.push(ws);
    });

    server.listen(8080);
  }

  app['delete']('/addressbook/:id', del);
  app.get('/addressbook/list', list);
  app.get('/addressbook/:id', get);
  app.put('/addressbook/:id', put);

  var PORT = 3000;
  app.listen(PORT);
  console.log('Express server listening on port', PORT);
}

getDatabase();
