'use strict';

var fs = require('fs');
var request = require('request');

// Output first 200 characters of a web page.
var url = 'http://ociweb.com/mark';
request(url, function (err, res, body) {
  if (err) {
    console.error(err);
  } else {
    console.log(body.substring(0, 200));
  }
});

// Copy an image file from a website using streaming.
url = 'http://ociweb.com/mark/images/waxlogo.png';
request(url).pipe(fs.createWriteStream('wax.png'));
console.log('copying image file ... please wait');
