'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Payment
 * @description
 * # Payment
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
   .factory('Payment', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      saveOrder: $resource(endpoint + '/users/payment/save-order', null, {
        'get': {
          method: 'GET',
		  headers: {"Authorization":sessionService.get('user_token')}
        }
      })
	}
  }]);
