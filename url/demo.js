'use strict';
var url = require('url');

var urlString = 'http://username:password@company.com:3000/foo/bar?month=April&color=yellow#baz';
var urlObj = url.parse(urlString, true, true);
console.log('urlObj =', urlObj);

urlObj.auth = 'fred:wilma';
delete urlObj.search;
urlObj.query.month = 'September';
urlObj.query.color = 'blue';
urlObj.hash = '#barney';
urlString = url.format(urlObj);
console.log('urlString =', urlString);

var baseUrl = 'http://www.ociweb.com/mark'; // will lose mark because it doesn't end in /
var relativeUrl = '../knowledge-sharing/tech-com/sett';
var resolvedUrl = url.resolve(baseUrl, relativeUrl);
console.log('resolvedUrl =', resolvedUrl);
console.log('typeof resolvedUrl =', typeof resolvedUrl);
