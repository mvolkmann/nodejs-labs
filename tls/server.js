'use strict';
var fs = require('fs');
var tls = require('tls');

var opts = {
  key: fs.readFileSync('mykey.pem'),
  cert: fs.readFileSync('mycert.pem'),
};
var server = tls.createServer(opts, function (cts) {
  console.log('server connected',
    cts.authorized ? 'authorized' : 'unauthorized');
  cts.setEncoding('utf8');
  cts.write('ping');
  cts.on('data', function (data) {
    console.log('got', data.toString(), 'from client');
    server.close();
    process.exit(0);
  });
  cts.on('end', function () {
    console.log('got end event from client');
  });
});
server.listen(8000, function() {
  console.log('ready');
});
