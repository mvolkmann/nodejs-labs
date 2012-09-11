'use strict';

module.exports = function (app, p1) {
  console.log('mw2: initializing; p1 =', p1);

  return function (env, cb) {
    var pathInfo = env.pathInfo;
    console.log('mw2: upstream for', pathInfo);
    app(env, function (status, headers, body) {
      console.log('mw2: downstream for', pathInfo);
      cb(status, headers, body);
    });
  };
};
