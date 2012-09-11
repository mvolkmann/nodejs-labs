'use strict';
var fs = require('fs');
var tls = require('tls');

var opts = {
  key: fs.readFileSync('mykey.pem'),
  cert: fs.readFileSync('mycert.pem'),
};

var cts = tls.connect(8000, opts);
cts.setEncoding('utf8');
cts.on('secureConnect', function () {
  console.log('client connected',
    cts.authorized ? 'authorized' : 'unauthorized');
});
cts.on('data', function (data) {
  console.log('got', data.toString(), 'from server');
  cts.write('pong');
});
cts.on('end', function () {
  console.log('got end event from server; process will exit');
});
cts.on('error', function (e) {
  var msg = e.code === 'ECONNREFUSED' ?
    'failed to connect; is server running?' : e.toString();
  console.error(msg);
});
