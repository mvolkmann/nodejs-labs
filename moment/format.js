'use strict';

var moment = require('moment');

// The example output in the comments below was obtained on 7/8/12.
var now = moment();

// Formatting examples
console.log(now.format('dddd, MMMM Do YYYY, h:mm:ss a'));
// Sunday, July 8th 2012, 2:43:07 pm

console.log(now.format('dddd [on the] wo [week of the year]'));
// Sunday on the 28th week of the year

console.log(now.format("MMM Do 'YY"));
// Jul 8th '12

console.log(now.format());
// 2012-07-08T14:43:07-05:00 - the ISO-8601 format
