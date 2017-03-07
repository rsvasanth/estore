'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.finance
 * @description
 * # finance
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('finance', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/finance", {}, {
      "getTransaction": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "getTransactionSingle": {
        url: endpoint + "/finance/:id",
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "payAmount": {
        url: endpoint + "/finance/pay-amount/:id",
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }])
