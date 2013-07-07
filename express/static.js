'use strict';
var express = require('express');

var app = express();

// Can have one line like the following to specify
// each directory to be searched for static files.
app.use(express.static(__dirname));
//app.use(express.bodyParser()); // for POST and PUT request bodies

var PORT = 1919;
app.listen(PORT);
console.log('browse http://localhost:' + PORT + '/google.gif');
