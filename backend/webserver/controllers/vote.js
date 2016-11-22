'use strict';

const Q = require('q');

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
      res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
    });
  }

  function getVotes(req, res) {
    const targetTuple = {objectType: req.query.objectType, id: req.query.id};
    const result = {
      count: 0,
      users: [],
      stats: {0: {value: 0}, 1: {value: 0}, '-1': {value: 0}}
    };

    Q.allSettled([
      lib.vote.getVoteStatictics(targetTuple),
      lib.vote.getNbOfVotes(targetTuple),
      lib.vote.getLastUsersWhoVoted(targetTuple)
    ]).spread((stats, count, last) => {
      if (stats.state === 'fulfilled') {
        stats.value.forEach(e => {
          result.stats[e._id] = {value: e.value};
        });
      }

      if (count.state === 'fulfilled') {
        result.count = count.value;
      }

      if (last.state === 'fulfilled') {
        result.users = last.value;
      }

      res.status(200).json(result);
    }, err => {
      logger.error('Error while getting votes', err);
      res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
    });
  }

};
