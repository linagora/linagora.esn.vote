(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .controller('voteButtonController', voteButtonController);

   function voteButtonController($log, voteClientService, session) {
     var self = this;

     self.setVote = setVote;
     self.targetTuple = {objectType: self.objectType, id: self.objectId};
     self.vote = {};

     voteClientService.getCurrentVote(self.targetTuple).then(function(result) {
       if (result.data.value) {
         self.vote.me = {value: result.data.value};
       }
     });

     function setVote(value) {
       voteClientService.vote(self.targetTuple, value).then(function() {
         self.vote.me = {value: value};
         self.onVote({value: value, user: session.user});
       }, function(err) {
         $log.error('Can not vote', err);
       });
     }
   }
})();
