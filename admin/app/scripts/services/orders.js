'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.orders
 * @description
 * # orders
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('orders', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/orders", {}, {
      "getOrders": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }])
