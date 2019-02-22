"use strict";

var ora = require('ora');

module.exports = function (message, pendingPromise) {
  var spinner = ora(message).start();

  if (typeof pendingPromise === 'function') {
    pendingPromise = pendingPromise();
  }

  return new Promise(function (resolve) {
    pendingPromise.then(function (res) {
      spinner.succeed();
      resolve(res);
    }).catch(function (e) {
      spinner.fail();
      console.error(e);
      process.exit(1);
    });
  });
};