(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .factory('voteRestangular', voteRestangular);

  function voteRestangular(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/vote/api');
      RestangularConfigurer.setFullResponse(true);
    });
  }
})();
