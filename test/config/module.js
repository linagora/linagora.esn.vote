'use strict';

/* global _: false */

angular.module('esn.router', []);
angular.module('esn.search', []);
angular.module('esn.scroll', []);
angular.module('esn.attendee', []);
angular.module('esn.header', []);
angular.module('esn.sidebar', []);
angular.module('esn.url', []);
angular.module('esn.oembed', []);
angular.module('esn.oembed.image', []);
angular.module('esn.localstorage', []);
angular.module('esn.file', []);
angular.module('esn.lodash-wrapper', []);
angular.module('esn.provider', []);
angular.module('esn.core', [])
.constant('_', _)
.constant('routeResolver', {
  session: function(key) {
    return ['$q', function($q) {
      var session = {
        user: {
          _id: 'id'
        },
        domain: 'domain'
      };

      return $q.when(session[key]);
    }];
  }
});
angular.module('esn.file-preview', []);
angular.module('luegg.directives', []);
