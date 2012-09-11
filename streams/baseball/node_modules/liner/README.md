# node-liner

[![Build Status](https://secure.travis-ci.org/mvolkmann/node-liner.png)](http://travis-ci.org/mvolkmann/node-liner)

This is a simple Node.js module that reads lines from files and streams.
There are other similar modules, but I believe they are
more complicated than they need to be.

## Example

    var Liner = require('liner');
    var liner = new Liner('./story.txt');
    liner.on('data', function (line) {
      console.log(line);
    });
    liner.on('err', function (err) {
      console.error(err);
    });
    liner.on('end', function () {
      process.exit(0);
    });

To run the example above:

    node example.js
