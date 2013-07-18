'use strict';
var moment = require('moment');

console.log(moment.duration(1, 'days').asHours()); // 24
console.log(moment.duration({hours: 2, minutes: 57, seconds: 11}).asHours()); // 2.953

var d = moment.duration({hours: 2, minutes: 59, seconds: 38});
console.log(d.humanize()); // 3 hours
console.log(d.asMinutes()); // 179.6333
