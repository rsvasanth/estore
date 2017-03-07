'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.user
 * @description
 * # user
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('users', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/users", {}, {
      query: {
        method: "GET",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      changePassword: {
        url: endpoint + "/users/change-password",
        method: "PUT",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      create: {
        method: "POST",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      get: {
        method: "GET",
        url: endpoint + "/users/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/users/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      update: {
        method: "PUT",
        url: endpoint + "/users/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      }
    })
  }]);
