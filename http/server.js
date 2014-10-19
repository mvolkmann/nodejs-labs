'use strict';
var http = require('http');
var qs = require('querystring');
var url = require('url');

var PORT = 3002;

// Create an HTTP server and give it a 'request' listener.
var server = http.createServer(function (req, res) {
  var urlString = req.url;

  // Many browsers, including Chrome, ask for this first.
  if (urlString === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
    return;
  }

  console.log('method =', req.method);
  console.log('url =', urlString);
  console.log('headers =', req.headers);
  console.log('HTTP version =', req.httpVersion);
  console.log('IP =', req.connection.remoteAddress);

  /*
  var index = urlString.indexOf('?');
  var path = urlString.substring(0, index);
  console.log('path =', path);
  var queryString = urlString.substring(index + 1);
  var params = qs.parse(queryString); // can't pass entire URL
  */
  var params = url.parse(urlString, true).query;

  console.log('query parameters =', params);

  // Decide what to write in response based on path and query parameters.
  // Express supports defining "routes" which makes this easier.

  // If there is data in the request body, it can be received in chunks.
  var data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    // All the data has been received now.
    console.log('data =', data);
  });

  var status = 200;
  // Can set response status and other headers in one call.
  //var responseHeaders = {'Content-Type': 'text/plain'};
  //res.writeHead(status, responseHeaders);

  // Can set response status and each header separately.
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/plain');

  // Write the response body after all headers have been written.

  // Can write response body in one call.
  //res.end('Hello, World!');

  // Can write response body in chunks.
  res.write('Hello');
  res.write(', ');
  res.write('Chunks!');
  res.end();
});

server.on('close', function (req, res) {
  console.log('close received from client');
});

server.on('connection', function (req, res) {
  console.log('connection created');
});

// Add another request listener.  This can be used as an alternative
// to passing a request listener function to http.createServer.
//server.on('request', function (req, res) {
//  console.log('request received');
//});

server.listen(PORT, function () {
  console.log('ready');
});
