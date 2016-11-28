(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .controller('voteController', voteController);

   function voteController(voteClientService) {
     var self = this;

     self.onVote = onVote;
     self.$onInit = $onInit;

     function $onInit() {
       voteClientService.getVotes({objectType: self.objectType, id: self.objectId}).then(function(result) {
         self.votes = result.data;
       });
     }

     function onVote(value, user) {
       if (!self.votes.me) {
         self.votes.count++;
       }

       // TODO: Push the user and limit size to N
       // TODO: Only when user is not already in
       self.votes.users.push(user);
       self.votes.me = {value: value};
       self.votes.stats[value].value++;
     }
   }
})();