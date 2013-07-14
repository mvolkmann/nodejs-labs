'use strict';
var domain = require('domain');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer();

// Start server by entering "node demo.js".
// Browse the following URLs and notice that all errors are handled.
// The server does not crash.
// http://localhost:1961 arg undefined; "TypeError: path must be a string"
// http://localhost:1961?arg=throw "SyntaxError: Unexpected token b" in JSON
// http://localhost:1961?arg=call "TypeError: Object call has no method 'badMethod'"
// http://localhost:1961?arg=async "Error: in async function"
// http://localhost:1961?arg=emit "from EventEmitter"
// http://localhost:1961?arg=bad.txt "Error: ENOENT, open 'bad.txt'
// http://localhost:1961?arg=data.txt works because the file exists

server.on('request', function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(404);
    return res.end();
  }

  var d = domain.create();

  d.on('error', function (err) {
    console.error('domain got', err);
    //console.error('domain got error:', err);
    res.writeHead(500);
    res.end(err.toString());
  });

  d.run(function () {
    var urlObj = url.parse(req.url, true);
    var arg = urlObj.query.arg;

    if (arg === 'throw') {
      JSON.parse('bad');
    } else if (arg === 'call') {
      arg.badMethod();
    } else if (arg === 'async') {
      setTimeout(function () {
        throw new Error('in async function');
      }, 500);
    } else if (arg === 'emit') {
      new EventEmitter().emit('error', new Error('from EventEmitter'));
    } else {
      // Treat arg as a relative file path and read from that file.
      fs.readFile(arg, d.intercept(function (data) { // note no err arg
        res.writeHead(200);
        res.end(data.toString());
      }));
    }
  });
});

var port = '1961';
server.listen(port);
console.log('listening on', port);
