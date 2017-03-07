'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ShopCtrl', ['$routeParams', 'Product', 'Category', "Cart", "$location", "sessionService", "$scope", function($routeParams, Product, Category, Cart, $location, sessionService, $scope) {

        var _this = this;


        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
		
		_this.limit = 9;
		this.expand = function(limit) { 
		  _this.limit += limit;
		}

        this.shopDetails = function() {
            var CProduct = new Product.shopProducts();
            CProduct
                .$get({
                    id: $routeParams.sid
                }, function(data) {
                    if (data.status == "success") {
                        _this.seller = data.response[0];
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }


        var shopList = new Product.shopList();
        shopList
            .$get(function(data) {
                if (data.status == "success") {
                    _this.shops = data.response;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        if ($routeParams.sid != undefined)
            this.shopDetails();


    }]);