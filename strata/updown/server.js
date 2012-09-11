'use strict';

var strata = require('strata');
var mw1 = require('mw1');
var mw2 = require('mw2');

strata.use(mw1, 'foo');
strata.use(mw2, 'bar');

strata.get('/*', function (env, cb) {
  console.log('server: for', env.pathInfo);
  var content = 'Hello, World!';
  var headers = {
    'Content-Type': 'text/plain',
    'Content-Length': content.length
  };
  cb(200, headers, content);
});

strata.run();
