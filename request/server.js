'use strict';
var http = require('http');
var qs = require('querystring');

var PORT = 3002;

var server = http.createServer(function (req, res) {
  var url = req.url;

  // Many browsers ask for this first.
  if (url === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
    return;
  }

  // Get query parameters.
  var index = url.indexOf('?');
  var queryString = url.substring(index + 1);
  var params = qs.parse(queryString); // can't pass entire URL

  // Sum the query parameter values.
  // Result will be NaN if any are not integers.
  var sum = 0;
  Object.keys(params).forEach(function (key) {
    sum += parseInt(params[key], 10);
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(sum.toString());
});

server.listen(PORT, function () {
  console.log('ready');
});
