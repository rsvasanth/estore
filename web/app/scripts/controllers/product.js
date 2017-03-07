'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ProductCtrl', ['$routeParams', 'Product', 'Category', "Cart", "$location", "sessionService", "$scope", function($routeParams, Product, Category, Cart, $location, sessionService, $scope) {

        var _this = this;
        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
        _this.re = {};
		
		this.range = function(min, max, step){
			step = step || 1;
			var input = [];
			for (var i = min; i <=max; i += step) input.push(i);
			return input;
		};
		
        $scope.isReadonly = false; // default test value
        $scope.changeOnHover = false; // default test value 
        $scope.maxValue = 5; // default test value
        $scope.ratingValue = 0; // default test value 
        _this.re.stars = $scope.ratingValue; // default test value 

        this.productDetails = function() {
            var CProduct = new Product.detailsProduct({
                id: $routeParams.pid
            });
            CProduct
                .$get(function(data) {
                    if (data.status == "success") {
                        _this.product = data.response.product[0];
                        var CProduct = new Product.cateProduct({
                            category: _this.product.categories[0]._id
                        });
                        CProduct
                            .$get(function(data) {
                                if (data.status == "success") {
                                    _this.related = data.response.product;
                                }
                            }, function(data) {
                                if (data.status == "401") {
                                    sessionService.get("token");
                                }
                            })
                        var shopTop = new Product.shopTop({
                            id: _this.product.seller_id
                        });
                        shopTop
                            .$get(function(data) {
                                if (data.status == "success") {
                                    _this.shoprelated = data.response[0].products;
                                }
                            }, function(data) {
                                if (data.status == "401") {
                                    sessionService.get("token");
                                }
                            })
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
            var getTopRated = Product.getTopRated;
			var gTPP = new getTopRated();
			gTPP
				.$get(function(data) {
					if (data.status == "success") {
						 var top_product = data.response.product;
                    for (var i = 0; i < top_product.length; i++) {
                        var item = top_product[i];
                        top_product[i].totalOffer = ((item.pricing.original - item.pricing.after_discount) / item.pricing.original) * 100;
                    }
						_this.topr = top_product;
						
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})

        }

        this.reviewDetails = function() {
            var reviewDetails = new Product.reviewDetails({
                id: $routeParams.pid
            });
            reviewDetails
                .$get(function(data) {
                    if (data.status == "success") {
                        _this.rating = data.response.rating;
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

        this.getReciveCheck = function() {
            var checkReview = new Product.checkReview({
                id: $routeParams.pid,
                oid: $routeParams.oid
            });
            checkReview
                .$get(function(data) {
                    if (data.status == "false") {
                        _this.review = 'active';
                    } else {
                        _this.review = 'active';
                        _this.reviews = 'active';
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

        this.saveReview = function() {
            _this.re.stars = parseInt($('#stars').val());
            var saveReview = new Product.saveReview(_this.re);
            saveReview
                .$get({
                    id: $routeParams.pid,
                    oid: $routeParams.oid
                }, function(data) {
                    var reviewDetails = new Product.reviewDetails({
                        id: $routeParams.pid
                    });
                    reviewDetails
                        .$get(function(data) {
                            if (data.status == "success") {
                                _this.rating = data.response.rating;
                                _this.reviews = "";
                            }
                        })
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

        this.addToCart = function() {
            var CProduct = new Product.AddtoCart({
                product_id: $routeParams.pid,
                quantity: _this.cart.quantity,
                product_variant: _this.cart.product_variant
            });
            CProduct
                .$get({
                    guest_token: sessionService.get("token")
                }, function(data) {
                    if (data.status == "success") {
                        _this.success = data;
                        var gC = new Cart.getCart();
                        gC.$get({
                            guest_token: sessionService.get("token")
                        }, function(data) {
                            if (data.status == "success") {
                                $scope.header.carts = data.response;
                                var total = 0;
                                data.response.forEach(function(product) {
                                    total += product.product_id.pricing.after_discount * product.product_quantity;
                                });
                                $scope.header.totalprice = total;
                            }
                        })
                    }
                    if (data.status == "fail")
                        _this.error = data;
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

        this.buyNow = function() {
            var CProduct = new Product.AddtoCart({
                product_id: $routeParams.pid,
                quantity: _this.cart.quantity,
                product_variant: _this.cart.product_variant
            });
            CProduct
                .$get({
                    guest_token: sessionService.get("token")
                }, function(data) {
                    if (data.status == "success") {
                        _this.success = data;
                        var gC = new Cart.getCart();
                        gC.$get({
                            guest_token: sessionService.get("token")
                        }, function(data) {
                            if (data.status == "success") {
                                $scope.header.carts = data.response;
                                var total = 0;
                                data.response.forEach(function(product) {
                                    total += product.product_id.pricing.after_discount * product.product_quantity;
                                });
                                $scope.header.totalprice = total;
                                $location.path('checkout');

                            }
                        })
                    }
                    if (data.status == "fail")
					{
                        _this.error = data;
						$location.path('checkout');
					}
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
        
        if ($routeParams.pid != undefined)
            this.productDetails(); this.reviewDetails();

        if ($routeParams.oid != undefined) {
            this.getReciveCheck();
            this.reviewDetails();
        } else
            _this.active = "active";




        $scope.$on('ngRepeatFinishedsell', function(ngRepeatFinishedEvent) {
			 $(".active-items-5").owlCarousel({
                autoPlay: false,
                slideSpeed: 2000,
                pagination: false,
                navigation: true,
                items: 4,
                /* transitionStyle : "fade", */
                /* [This code for animation ] */
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [991, 3],
                itemsTablet: [767, 1],
                itemsMobile: [479, 1],
            });
		});
		
        $scope.$on('ngRepeatFinishedu', function(ngRepeatFinishedEvent) {

            $(".cart-plus-minus").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');
            $(".qtybutton").on("click", function() {
                var $button = $(this);
                var oldValue = $button.parent().find("input").val();
                var limit = $button.parent().find("input").attr('max');
                if ($button.text() == "+") {

                    if (parseFloat(limit) > parseFloat(oldValue)) {

                        var newVal = parseFloat(oldValue) + 1;
                    } else
                        var newVal = parseFloat(oldValue);
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 1) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 1;
                    }
                }
                _this.cart.quantity = newVal;
                $button.parent().find("input").val(newVal);

            });
            $(".active-items-4").owlCarousel({
                autoPlay: false,
                slideSpeed: 2000,
                pagination: false,
                navigation: true,
                items: 4,
                /* transitionStyle : "fade", */
                /* [This code for animation ] */
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [991, 3],
                itemsTablet: [767, 1],
                itemsMobile: [479, 1],
            });

        });

    }]);