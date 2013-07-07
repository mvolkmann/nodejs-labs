'use strict';

var cluster = require('cluster');
if (cluster.isMaster) return startWorkers();

function startWorkers() {
  console.log('master pid =', process.pid);

  var handleMsg = function (worker, msg) {
    console.log('got message from worker id =', worker.id,
      'pid =', worker.process.pid);
    console.log('msg =', msg);
    Object.keys(cluster.workers).forEach(function (id) {
      var otherWorker = cluster.workers[id];
      var otherWorkerPid = otherWorker.process.pid;
      if (otherWorkerPid !== msg.senderPid) { // don't send to sender
        console.log('sending to worker id =', id, 'pid =', otherWorkerPid);
        otherWorker.process.send(msg);
      }
    });
  };

  var addWorker = function () {
    var worker = cluster.fork();
    console.log('worker id =', worker.id, 'pid =', worker.process.pid);
    worker.on('message', function (msg) {
      handleMsg(worker, msg);
    });
  };

  // If a worker exits, start a new one.
  cluster.on('exit', addWorker);
  /*
  cluster.on('exit', function (worker) {
    console.log('worker with pid', worker.process.pid,
      'exited - starting new worker');
    addWorker();
  });
  */

  // Fork worker processes.
  var cpuCount = require('os').cpus().length;
  for (var i = 1; i < cpuCount; i++) {
    addWorker();
  }
}

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

  // Listen for messages from cluster master.
  process.on('message', function (msg) {
    console.log('pid', process.pid, 'received', msg);
    if (msg.senderPid !== process.pid) sendToClients(msg);
  });

  function sendToClients(msg) {
    var s = JSON.stringify(msg);
    console.log('sendToClients:', s);
    console.log('sendToClients: wsArray.length =', wsArray.length);
    wsArray.forEach(function (ws, index) {
      ws.send(s, function (err) {
        if (err) wsArray[index] = null; // stop sending to this ws
      });
    });

    // Remove nulls from array.
    wsArray = wsArray.filter(function (ws) { return ws; });
  }

  function broadcast(event, id) {
    var msg = {event: event, id: id, senderPid: process.pid};

    // Send to cluster master.
    process.send(msg);

    sendToClients(msg);
  }

  function getMongoQuery(req) {
    var id = req.params.id;
    var pieces = id.split('-');
    return {lastName: pieces[0], firstName: pieces[1]};
  }

  function del(req, res) {
    console.log('received DELETE request in pid', process.pid);
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
    console.log('received GET list request in pid', process.pid);
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
    console.log('received PUT request in pid', process.pid);
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
      console.log('got WebSocket connection in pid =', process.pid);
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
