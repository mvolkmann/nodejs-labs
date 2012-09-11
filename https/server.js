'use strict';
var fs = require('fs');
var https = require('https');

var PORT = 3002;
var opts = {
  key: fs.readFileSync('mykey.pem'),
  cert: fs.readFileSync('mycert.pem')
};

var server = https.createServer(opts, function (req, res) {
  // Many browsers, including Chrome, ask for this first.
  if (req.url === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.end('Hello, World!');
});

server.listen(PORT, function () {
  console.log('ready');
});
