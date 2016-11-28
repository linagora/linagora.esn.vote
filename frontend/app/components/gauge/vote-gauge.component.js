(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .component('voteGauge', voteGauge());

  function voteGauge() {
    var component = {
      templateUrl: '/vote/app/components/gauge/vote-gauge.html',
      controller: 'voteGaugeController',
      controllerAs: 'ctrl',
      bindings: {
        votes: '='
      }
    };

    return component;
  }
})();
