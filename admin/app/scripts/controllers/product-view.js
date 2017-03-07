'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:ProductViewCtrl
 * @description
 * # ProductViewCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('ProductViewCtrl', [
    'Product',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(Product, $scope, $location, $routeParams,sessionService) {
      var _this = this;
      _this.title = "View Product";
      var getSingleProduct = Product.getSingleProduct;
      var gAP = new getSingleProduct({id: $routeParams.id});
      gAP
        .$get(function(data) {
          var response = data.response;
          if (data.status == "success") {
            _this.product_details = response.product;
          }
          else {
            _this.notify = {
              message: response.statusMessage,
              status: response.status,
              type: "danger"
            }
          }
        }, function(data) {
          var response = data.response;
          if (data.status == "401") {
            sessionService.destroy('token');
            $location.path("/login");
          }
          _this.notify = {
            message: response.statusMessage,
            status: response.status,
            type: "danger"
          }
        });
    }
  ]);
