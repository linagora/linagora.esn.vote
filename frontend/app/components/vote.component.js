(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .component('vote', vote());

  function vote() {
    var component = {
      templateUrl: '/vote/app/components/vote.html',
      controller: 'voteController',
      controllerAs: 'ctrl',
      bindings: {
        objectType: '=',
        objectId: '=',
        onVote: '&'
      }
    };

    return component;
  }
})();
