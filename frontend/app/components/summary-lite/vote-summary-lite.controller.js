(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .controller('voteSummaryLiteController', voteSummaryLiteController);

   function voteSummaryLiteController(voteClientService) {
     var self = this;

     self.$onInit = $onInit;

     function $onInit() {
       voteClientService.getVotes({objectType: self.objectType, id: self.objectId}).then(function(result) {
         self.votes = result.data;
       });
     }
   }
})();
