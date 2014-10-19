'use strict';
var cluster = require('cluster');
var http = require('http');

var PORT = 8000;

// Does one processor have to be used for the master
// and not provide the same functionality as the workers?
if (cluster.isMaster) { // also cluster.isWorker
  var requestCount = 0;
  var handleMsg = function (msg) {
    if (msg.cmd === 'gotRequest') {
      requestCount++;
      console.log('requestCount =', requestCount);
    }
  };

  // To trigger this, use "ps -ef" to list processes
  // and "kill {pid}" to kill a worker process.
  cluster.on('exit', function (worker) {
    console.log('worker with pid', worker.process.pid, 'exited - starting new worker');
    worker = cluster.fork();
    worker.on('message', handleMsg);
  });

  // Fork worker processes.
  var cpuCount = require('os').cpus().length;
  console.log('cpuCount =', cpuCount);
  for (var i = 1; i < cpuCount; i++) {
    var worker = cluster.fork();
    worker.on('message', handleMsg);
    worker.send('worker number is ' + i);
  }

  // Can the master also start a server?  It seems that it can.
  /*
  http.Server(function (req, res) {
    setTimeout(function () {
      res.writeHead(200);
      res.end('Hello from master process ' + process.pid + '!\n');
      console.log('master with pid', process.pid, 'handled a request');
    }, 1000);
  }).listen(PORT);
  */
} else {
  // Start an HTTP server in worker processes.
  // TODO: How does the OS decide which HTTP server will handle each request?
  // TODO: It seems that is uses the same one unless it is busy.
  http.Server(function (req, res) { // not a constructor function
    if (req.url === '/favicon.ico') {
      res.writeHead(404);
      res.end();
      return;
    }

    // Simulate taking a while to process request.
    setTimeout(function () {
      //res.writeHead(200);
      res.statusCode = 200;
      res.end('Hello from process ' + process.pid + '!\n');

      console.log('worker with pid', process.pid, 'handled a request');

      // Send message to master process.
      process.send({cmd: 'gotRequest'});
      //throw 'testing what this does'
    }, 1000);
  }).listen(PORT);

  console.log('worker server pid', process.pid, 'ready');

  process.on('message', function (msg) {
    console.log('worker received', msg);
  });
}
