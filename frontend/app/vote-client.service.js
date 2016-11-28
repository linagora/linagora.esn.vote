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

      function getVotes(targetTuple) {
        return voteRestangular.one('votes').get(targetTuple);
      }

      function vote(targetTuple, value) {
        return ResourceLinkAPI.create(_getSource(), targetTuple, VOTE_LINK_TYPE, value);
      }
    }
})();
