'use strict';
var strata = require('strata');

var BAD_REQUEST = 400;
var NOT_FOUND = 404;
var OK = 200;

strata.use(strata.contentType, 'text/plain'); // default
strata.use(strata.contentLength);

/*
strata.get('/favicon.ico', function (env, cb) {
  var headers = {};
  cb(NOT_FOUND, headers, '');
});
*/

strata.get('/add/:n1/:n2', function (env, cb) {
  var n1 = parseInt(env.route.n1, 10);
  var n2 = parseInt(env.route.n2, 10);
  var result;
  var status;

  if (isNaN(n1) || isNaN(n2)) {
    result = 'path parts after "add" must be integers';
    status = BAD_REQUEST;
  } else {
    result = 'sum is ' + (n1 + n2);
    status = OK;
  }

  var headers = {};
  cb(status, headers, result);
});

strata.run(function (env, cb) {
  var path = env.pathInfo.substring(1); // removes leading slash
  var operation = path.split('/')[0];
  var msg = operation + ' operation is not supported';
  var headers = {};
  cb(BAD_REQUEST, headers, msg);
});
