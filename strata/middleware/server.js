'use strict';

var strata = require('strata');
var mw = require('mw');

strata.use(strata.commonLogger);
strata.use(mw, 'foo');

strata.get('/foo/*', function (env, cb) {
  console.log('server: using get /foo router');
  console.log('env =', env);
  cb(200, {}, 'Hello, World!');
});

strata.run(function (env, cb) {
  console.log('server: handling request');
  console.log('pathInfo =', env.pathInfo);
  console.log('env =', env);
  cb(200, {}, 'Hello, World!');
});
