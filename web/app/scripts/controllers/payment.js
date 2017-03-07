'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('PaymentCtrl', ['$routeParams', 'Payment', "$location", "sessionService", 'endpoint', "$scope", function($routeParams, Payment, $location, sessionService, endpoint, $scope) {
        var _this = this;
        var saveOrder = Payment.saveOrder;
        var sO = new saveOrder();
        sO
            .$get({
                guest_token: sessionService.get("token"),
                payid: $routeParams.tx,
                status: $routeParams.st
            }, function(data) {
                if (data.status == "success") {
                    _this.success = data;
					$location.path('order');
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
    }])