'use strict';

var _ = require('underscore');

var t = _.template('<a href="<%= href %>"><%= text %></a>');
var anchor = t({href: 'http://ociweb.com', text: 'OCI'});
console.log(anchor);
