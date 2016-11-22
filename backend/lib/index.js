'use strict';

module.exports = function(dependencies) {

  const vote = require('./vote')(dependencies);

  return {
    start,
    vote
  };

  function start(callback) {
    callback();
  }
};
