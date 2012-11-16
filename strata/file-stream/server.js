'use strict';
var fs = require('fs');
var strata = require('strata');

var NOT_MODIFIED = 304;

strata.get('/dasher', function (env, cb) {
  var path = 'dasher.jpg';
  fs.stat(path, function (err, stats) {
    if (err) {
      return strata.handleError(err, env, cb);
    }

    // If the 'If-Modified-Since' header was supplied
    // and the file has not been modified since then ...
    var ifModifiedSince = env.headers['if-modified-since'];
    if (ifModifiedSince && stats.mtime <= new Date(ifModifiedSince)) {
      // Don't bother returning the file content.
      return cb(NOT_MODIFIED, {});
    }

    var res = strata.Response(fs.createReadStream(path));
    //res.contentType = 'image/jpeg'; // browser can detect this
    res.contentLength = stats.size; // uses chunked transfer encoding without this
    res.lastModified = stats.mtime;
    res.send(cb);
  });
});

strata.run();
