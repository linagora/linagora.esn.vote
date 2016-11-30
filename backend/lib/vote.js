'use strict';

const CONSTANTS = require('./constants');
const Q = require('q');

module.exports = function(dependencies) {
  const resourceLink = dependencies('resource-link');
  const mongoose = dependencies('db').mongo.mongoose;
  const userModule = dependencies('user');
  const ResourceLink = mongoose.model('ResourceLink');

  return {
    getLastUsersWhoVoted,
    getNbOfVotes,
    getVote,
    getVoteStatictics,
    hasVoted,
    unvote,
    vote
  };

  function getLastUsersWhoVoted(targetTuple, size = CONSTANTS.DEFAULT_LIMIT) {

    function linkAsUser(link) {
      return Q.denodeify(userModule.get)(link.source.id).then(user => {
        // wait for OR-2459
        if (userModule.denormalize) {
          return userModule.denormalize.denormalize(user);
        }

        return user;
      });
    }

    return ResourceLink.find({'target.id': targetTuple.id, 'target.objectType': targetTuple.objectType, type: CONSTANTS.VOTE_LINK_TYPE})
      .sort('-timestamps.creation')
      .limit(size)
      .then(links => Q.all(links.map(linkAsUser)));
  }

  function getVote(sourceTuple, targetTuple) {
    return resourceLink.list({source: sourceTuple, target: targetTuple, type: CONSTANTS.VOTE_LINK_TYPE}).then(function(links) {
      if (!links || !links.length) {
        return {};
      }

      return links[0];
    });
  }

  function getVoteStatictics(targetTuple) {
    const mr = {
      query: {
        type: CONSTANTS.VOTE_LINK_TYPE,
        'target.objectType': targetTuple.objectType,
        'target.id': targetTuple.id
      },
      verbose: true,
      map: function() {
        emit(this.value, 1);
      },
      reduce: function(key, values) {
        return values.length;
      }
    };

    return ResourceLink.mapReduce(mr);
  }

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
