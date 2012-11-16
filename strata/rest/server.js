/**
 * Example requests using curl:
 * Add object with key "player".
     curl -XPUT http://localhost:1982/list/player -H 'Content-Type: application/json' \
       -d '{"name": "Gretzky", "number": 99}'
 * Add text with key "dog".
     curl -XPUT http://localhost:1982/list/dog -H 'Content-Type: text/plain' -d 'Rudy'
 * Get all the keys and values.
     curl http://localhost:1982/list
 * Get the value for the key "player".
     curl http://localhost:1982/list/player
 * Get the value for the key "dog".
     curl http://localhost:1982/list/dog
 * Delete the key "player".
     curl -XDELETE http://localhost:1982/list/player
 * Verify that the delete succeeded.
     curl http://localhost:1982/list/player
 * Verify that the key "dog" is still present.
     curl http://localhost:1982/list
 */
'use strict';
var strata = require('strata');

var BAD_REQUEST = 400;
var NO_CONTENT = 204;
var NOT_FOUND = 404;
var OK = 200;
var list = {};

//strata.use(strata.contentType, 'application/json');

strata.put('/list/:key', function (env, cb) {
  var key = env.route.key;

  var contentType = env.headers['content-type'];
  var isJSON = contentType === 'application/json';

  var bufs = [];
  env.input.on('data', function (buf) {
    bufs.push(buf);
  });
  env.input.on('end', function () {
    var body = Buffer.concat(bufs).toString();
    try {
      list[key] = isJSON ? JSON.parse(body) : body;
      cb(NO_CONTENT, {}, '');
    } catch (e) {
      cb(BAD_REQUEST, {}, e.toString());
    }
  });
  env.input.resume();
});

strata.get('/list', function (env, cb) {
  cb(OK, {'Content-Type': 'application/json'}, JSON.stringify(list));
});

strata.get('/list/:key', function (env, cb) {
  var key = env.route.key;
  var value = list[key];
  if (value) {
    cb(OK, {'Content-Type': 'application/json'}, JSON.stringify(value));
  } else {
    cb(NOT_FOUND, {}, key + ' not found');
  }
});

strata.delete('/list/:key', function (env, cb) {
  var key = env.route.key;
  var value = list[key];
  if (value) {
    delete list[key];
    cb(NO_CONTENT, {}, '');
  } else {
    cb(NOT_FOUND, {}, key + ' not found');
  }
});

strata.run(function (env, cb) {
  var msg = env.requestMethod + ' ' + env.pathInfo + ' is not supported';
  cb(BAD_REQUEST, {}, msg);
});
