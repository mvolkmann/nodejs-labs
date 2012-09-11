'use strict';

module.exports = function (app, param) {
  console.log('mw: initializing');
  console.log('mw: param =', param);

  return function (env, cb) {
    console.log('mw: upstream');
    app(env, function (status, headers, body) {
      console.log('mw: downstream');
      cb(status, headers, body);
    });
  };
};

