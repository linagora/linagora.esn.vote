'use strict';

const CONSTANTS = require('./constants');

module.exports = function(dependencies) {
  const resourceLink = dependencies('resource-link');

  return {
    getNbOfVotes,
    hasVoted,
    unvote,
    vote
  };

  function getNbOfVotes(targetTuple) {
    return resourceLink.count({target: targetTuple, type: CONSTANTS.VOTE_LINK_TYPE});
  }

  function hasVoted(sourceTuple, targetTuple) {
    return resourceLink.exists({source: sourceTuple, target: targetTuple, type: CONSTANTS.VOTE_LINK_TYPE});
  }

  function vote(sourceTuple, targetTuple, value) {
    return resourceLink.create({source: sourceTuple, target: targetTuple, type: CONSTANTS.VOTE_LINK_TYPE, value});
  }

  function unvote(sourceTuple, targetTuple) {
    return resourceLink.remove({source: sourceTuple, target: targetTuple, type: CONSTANTS.VOTE_LINK_TYPE});
  }
};
