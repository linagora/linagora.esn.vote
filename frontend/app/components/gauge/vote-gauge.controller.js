(function() {
  'use strict';

  angular.module('linagora.esn.vote')
    .controller('voteGaugeController', voteGaugeController);

   function voteGaugeController() {
     var self = this;

     self.gaugeItemWidth = gaugeItemWidth;

     function gaugeItemWidth(item) {
       return self.votes.stats[item] && self.votes.stats[item].value ? (self.votes.stats[item].value * 100) / self.votes.count : 0;
     }
   }
})();
