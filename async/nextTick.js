'use strict';
var async = require('async');
var Stream = require('stream');
var util = require('util');

function MyStream() {
  Stream.call(this);
  var that = this;
  //process.nextTick(function () {
  async.nextTick(function () {
    for (var n = 1; n <= 3; n++) {
      that.emit('data', n);
    }
    that.emit('end');
  });
}
util.inherits(MyStream, Stream);

var ms = new MyStream();
ms.on('data', function (n) {
  console.log(n);
});
ms.on('end', function () {
  console.log('finished');
});
