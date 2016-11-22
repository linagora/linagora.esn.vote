(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .factory('voteClientService', voteClientService);

    function voteClientService($q, ResourceLinkAPI, session, voteRestangular, VOTE_LINK_TYPE) {

      return {
        getCurrentVote: getCurrentVote,
        getVotes: getVotes,
        vote: vote
      };

      function _getSource() {
        return {
          objectType: 'user',
          id: session.user._id
        };
      }

      function getCurrentVote(targetTuple) {
        return voteRestangular.one('user/votes').get(targetTuple);
      }

      function getVotes() {
        return $q.when({
          data: {
            count: 123,
            voters: [],
            stats: {'-1': {value: 12}, 0: {value: 88}, 1: {value: 23}}
          }
        });
      }

      function vote(targetTuple, value) {
        return ResourceLinkAPI.create(_getSource(), targetTuple, VOTE_LINK_TYPE, value);
      }
    }
})();
