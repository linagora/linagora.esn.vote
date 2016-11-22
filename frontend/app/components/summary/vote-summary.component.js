(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .component('voteSummary', voteSummary());

  function voteSummary() {
    var component = {
      templateUrl: '/vote/app/components/summary/vote-summary.html',
      controllerAs: 'ctrl',
      bindings: {
        objectType: '=',
        objectId: '=',
        votes: '='
      }
    };

    return component;
  }
})();
