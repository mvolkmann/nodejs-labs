'use strict';
var async = require('async');
var fs = require('fs');
async.log(fs.stat, __filename);
