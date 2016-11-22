'use strict';

const express = require('express');
const CONSTANTS = require('../../lib/constants');

module.exports = function(dependencies, lib) {

  const router = express.Router();
  const resourceLinkMiddleware = dependencies('resourceLinkMW');
  const voteMiddleware = require('../middlewares/vote')(dependencies);

  require('./vote')(dependencies, lib, router);

  resourceLinkMiddleware.addCanCreateMiddleware(CONSTANTS.VOTE_LINK_TYPE, voteMiddleware.canVote);

  return router;
};
