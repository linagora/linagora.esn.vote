(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .controller('voteButtonController', voteButtonController);

   function voteButtonController($log, voteClientService, session) {
     var self = this;

     self.switchVote = switchVote;
     self.targetTuple = {objectType: self.objectType, id: self.objectId};
     self.vote = {};

     voteClientService.getCurrentVote(self.targetTuple).then(function(result) {
       if (result.data.value) {
         self.vote.me = {value: result.data.value};
       }
     });

     function switchVote(value) {

       if (self.vote.me && self.vote.me.value && (value === self.vote.me.value)) {
         return unvote(value);
       }

       vote(value);
     }

     function unvote(value) {
       voteClientService.unvote(self.targetTuple).then(function() {
         delete self.vote.me;
         self.onUnvote({value: value, user: session.user});
       }, function(err) {
         $log.error('Can not unvote', err);
       });
     }

     function vote(value) {
       voteClientService.vote(self.targetTuple, value).then(function() {
         self.vote.me = {value: value};
         self.onVote({value: value, user: session.user});
       }, function(err) {
         $log.error('Can not vote', err);
       });
     }
   }
})();
