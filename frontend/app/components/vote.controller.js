(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .controller('voteController', voteController);

   function voteController(voteClientService, _) {
     var self = this;

     self.onUnvote = onUnvote;
     self.onVote = onVote;
     self.$onInit = $onInit;

     function $onInit() {
       voteClientService.getVotes({objectType: self.objectType, id: self.objectId}).then(function(result) {
         self.votes = result.data;
       });
     }

     function onUnvote(value, user) {
       _.remove(self.votes.users, {_id: user._id});

       self.votes.count--;
       delete self.votes.me;
       self.votes.stats[value].value--;
     }

     function onVote(value, user) {
       if (!_.find(self.votes.users, {_id: user._id})) {
         self.votes.users.push(user);
       }

       self.votes.count++;
       self.votes.me = {value: value};
       self.votes.stats[value].value++;
     }
   }
})();
