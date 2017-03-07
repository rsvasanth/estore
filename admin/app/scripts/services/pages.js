'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.pages
 * @description
 * # pages
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('pages', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/pages", {}, {
      query: {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      create: {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      },
      get: {
        method: "GET",
        url: endpoint + "/pages/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/pages/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      update: {
        method: "PUT",
        url: endpoint + "/pages/:id",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }]);
