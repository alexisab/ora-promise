"use strict";

var ora = require('ora');

module.exports = function (message, pendingPromise) {
  var spinner = ora(message).start();

  if (typeof pendingPromise === 'function') {
    pendingPromise = pendingPromise();
  }

  return new Promise(function (resolve) {
    pendingPromise.then(function () {
      spinner.succeed();
      resolve();
    }).catch(function (e) {
      spinner.fail();
      console.error(e);
      process.exit(1);
    });
  });
};