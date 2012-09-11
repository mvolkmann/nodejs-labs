'use strict';

var dnode = require('dnode');
var ecstatic = require('ecstatic')(__dirname);
var http = require('http');
var shoe = require('shoe');
var PORT = 3000;

var server = http.createServer(ecstatic);
server.listen(PORT);

var sock = shoe(function (stream) {
  // Create a DNode server.
  var dn = dnode({
    gradeScore: function (score, cb) {
      var grade = score >= 90 ? 'A' :
        score >= 80 ? 'B' :
        score >= 70 ? 'C' :
        score >= 60 ? 'D' :
        'F';
      cb(grade);
    }
  });
});

sock.install(server, '/dnode');
