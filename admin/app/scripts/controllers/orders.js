'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('OrdersCtrl', ['orders', "$scope", "$location", "sessionService", function(Orders, $scope, $location, sessionService) {
    var _this = this;
    _this.title = "View Orders";
    Orders.getOrders({}, {}, function(data) {
      if (data.status == "success") {
        _this.orders = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
  }]);
