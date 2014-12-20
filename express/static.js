'use strict';
var express = require('express');

var app = express();

// Can have one line like the following to specify
// each directory to be searched for static files.
app.use(express.static(__dirname));

var PORT = 1919;
app.listen(PORT, function () {
  console.log('browse http://localhost:' + PORT + '/google.gif');
});
