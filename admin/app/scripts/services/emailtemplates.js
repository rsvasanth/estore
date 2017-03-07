'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.emailtemplates
 * @description
 * # emailtemplates
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('emailtemplates', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/emailtemplates", {}, {
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
        url: endpoint + "/emailtemplates/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/emailtemplates/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      update: {
        method: "PUT",
        url: endpoint + "/emailtemplates/:id",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }]);
