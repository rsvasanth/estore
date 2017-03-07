'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.siteConfiguration
 * @description
 * # siteConfiguration
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('siteConfiguration', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/admin/settings", {}, {
      "getConfiguration": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "saveConfiguration": {
        method: "PUT",
        headers: {"Authorization": sessionService.get("token")}
      },
      "createConfiguration": {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }])
  .service('homePageConfiguration', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/admin/home-page-settings", {}, {
      "getConfiguration": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "saveConfiguration": {
        method: "PUT",
        headers: {"Authorization": sessionService.get("token")}
      },
      "createConfiguration": {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }]);
