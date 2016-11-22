(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .factory('voteClientService', voteClientService);

    function voteClientService(ResourceLinkAPI, session, VOTE_LINK_TYPE) {

      return {
        vote: vote
      };

      function vote(targetTuple, value) {
        var sourceTuple = {
          objectType: 'user',
          id: session.user._id
        };

        return ResourceLinkAPI.create(sourceTuple, targetTuple, VOTE_LINK_TYPE, value);
      }
    }
})();
