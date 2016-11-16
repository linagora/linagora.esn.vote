'use strict';

module.exports = function(dependencies, lib, router) {

  const authorizationMW = dependencies('authorizationMW');
  const controller = require('../controllers/vote')(dependencies, lib);

  router.get('/votes',
    authorizationMW.requiresAPILogin,
    controller.getVotes);
};
