'use strict';

var moment = require('moment');

var m = moment();
console.log('m =', m);
console.log('m is a', m.constructor.name);

// Timeago - doesn't seem useful
console.log(moment("2011-10-31", "YYYY-MM-DD").fromNow()); // 8 months ago

// Calendar Time - doesn't seem useful
console.log(moment().subtract('days', 3).calendar()); // last Thursday at 2:43 PM
