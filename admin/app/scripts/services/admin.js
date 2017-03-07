'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Admin
 * @description
 * # Admin
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('AdminAuth', ['$resource', 'endpoint', function($resource, endpoint) {
    return $resource(endpoint+'/admin/auth', null,
    {
        'login': { method:'POST' }
    });
  }]);
