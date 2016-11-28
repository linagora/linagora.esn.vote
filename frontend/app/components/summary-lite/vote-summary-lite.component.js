(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .component('voteSummaryLite', voteSummaryLite());

  function voteSummaryLite() {
    var component = {
      templateUrl: '/vote/app/components/summary-lite/vote-summary-lite.html',
      controller: 'voteSummaryLiteController',
      controllerAs: 'ctrl',
      bindings: {
        objectType: '=',
        objectId: '='
      }
    };

    return component;
  }
})();
