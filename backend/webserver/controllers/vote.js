'use strict';

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');

  return {
    getCurrentUserVote,
    getVotes
  };

  function getCurrentUserVote(req, res) {
    lib.vote.getVote({objectType: 'user', id: String(req.user._id)}, {objectType: req.query.objectType, id: req.query.id}).then(function(vote) {
      res.status(200).json(vote);
    }, function(err) {
      logger.error('Error while getting user vote', err);

    });
  }

  function getVotes(req, res) {
    res.status(200).json([]);
  }

};
