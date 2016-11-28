(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .component('voteButton', voteButton());

  function voteButton() {
    var component = {
      templateUrl: '/vote/app/components/button/vote-button.html',
      controller: 'voteButtonController',
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
