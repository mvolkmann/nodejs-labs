'use strict';
var strata = require('strata');

strata.use(strata.file, 'public', 'index.html');
strata.use(strata.directory, 'public');
strata.run();
