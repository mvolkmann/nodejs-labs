'use strict';
var http = require('http');

http.createServer(function (req, res) {
  console.log('got a request for url', req.url);
  res.writeHead(200);
  res.end('Hello, World!');
}).listen(3002);
