'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('CartCtrl', ['$routeParams', 'Cart', "$location", "sessionService", "$scope", function($routeParams, Cart, $location, sessionService, $scope) {

        var _this = this;

        this.close = function() {
            _this.status = '';
        }
        var getCart = Cart.getCart;
        var gC = new getCart();
        gC
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
				
                if (data.status == "success") {
                    _this.carts = data.response;
                    var total = 0;
                    var ship = 0;
                    data.response.forEach(function(product) {
                        total += product.product_id.pricing.after_discount * product.product_quantity;
						if(product.product_id.paid_by_buyer==true)
                        ship += product.product_id.shipping_details.fee;
						else
							ship +=0;
                    });
                    $scope.header.totalprice = total;
                    _this.totalprice = total;
                    _this.shipprice = ship;
                    _this.overprice = ship + total;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        this.removeCart = function(pid) {
            _this.dataLoading = true;
            var Cup = new Cart.RemoveCart();
            Cup
                .$get({
                    guest_token: sessionService.get("token"),
                    cart_id: pid
                }, function(data) {
                    if (data.status == "success") {
                        _this.success = data;
                        var gC = new Cart.getCart();
                        gC.$get({
                            guest_token: sessionService.get("token")
                        }, function(data) {
                            if (data.status == "success") {
                                $scope.header.carts = data.response;
                                _this.carts = data.response;
                                var total = 0;
                                var ship = 0;
                                data.response.forEach(function(product) {
                                    total += product.product_id.pricing.after_discount * product.product_quantity;
                                    if(product.product_id.paid_by_buyer==true)
									ship += product.product_id.shipping_details.fee;
									else
										ship +=0;
                                });
                                $scope.header.totalprice = total;
                                _this.totalprice = total;
                                _this.shipprice = ship;
                                _this.overprice = ship + total;
                                _this.dataLoading = false;
                            }
                        })
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

        this.updateCart = function(old, limit, pid) {
            var transformedInput = $('#' + pid).val().replace(/[^0-9-]/g, '');
            if (0 >= $('#' + pid).val()) {
                $('#' + pid).val(old);
                _this.status = 'error';
                _this.statusMessage = "Please enter valid number";
                return false;
            }
            if (old == $('#' + pid).val())
                return false;
            if ($('#' + pid).val() !== transformedInput) {
                $('#' + pid).val(old);
                _this.status = 'error';
                _this.statusMessage = "Please enter valid number";
                return false;
            }

            if (limit < $('#' + pid).val()) {
                _this.error = pid;
                _this.status = 'error';
                _this.statusMessage = " Sorry! Only "+limit+" Item available";
                return false;
            }
            _this.dataLoading = true;
            $scope.carts = [];
            var Cup = new Cart.UpdateToCart({
                product_id: pid,
                quantity: $('#' + pid).val()
            });
            Cup
                .$get({
                    guest_token: sessionService.get("token")
                }, function(data) {
					if(data.status=='fail')
					$location.path("#/login");
                    if (data.status == "success") {
						
                        _this.success = data;
                        var gC = new Cart.getCart();
                        gC.$get({
                            guest_token: sessionService.get("token")
                        }, function(data) {
                            if (data.status == "success") {
                                $scope.header.carts = data.response;
                                _this.carts = data.response;
                                var total = 0;
                                var ship = 0;
                                data.response.forEach(function(product) {
                                    total += product.product_id.pricing.after_discount * product.product_quantity;
                                    if(product.product_id.paid_by_buyer==true)
									ship += product.product_id.shipping_details.fee;
									else
										ship +=0;
                                });
                                $scope.header.totalprice = total;
                                _this.totalprice = total;
                                _this.shipprice = ship;
                                _this.overprice = ship + total;
                                _this.dataLoading = false;
                            }
                        })
                    }
                }, function(data) {
                    if (data.status == "401") {
                        _this.dataLoading = false;
                        sessionService.get("token");
                    }
                })
        }
    }]);