'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Account
 * @description
 * # Account
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Account', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      getDetails: $resource(endpoint + '/users/account/get-details', null, {
        'get': {
          method: 'GET'
        }
      }),
	  saveDetails: $resource(endpoint + '/users/account/update', null, {
        'get': {
          method: 'PUT'
        }
      }),
	  updatePassword: $resource(endpoint + '/users/account/change-password', null, {
        'get': {
          method: 'POST'
        }
      })
	}
  }]);
