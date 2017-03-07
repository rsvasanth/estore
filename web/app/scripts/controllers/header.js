'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('HeaderCtrl', ['$cookieStore', 'seller', '$routeParams', 'Product', 'Category', 'search', 'Cart', "$location", "sessionService", "$scope", "$rootScope", function($cookieStore, seller, $routeParams, Product, Category, search, Cart, $location, sessionService, $scope, $rootScope) {
        var _this = this;
        
        _this.user = sessionService.get('user');
        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
		
		_this.sellerurl=seller;
		
		
		_this.limit = 9;
		this.expand = function(limit) { 
		  _this.limit += limit;
		}
		
        var getAdmin = Product.getAdmin;
        var gA = new getAdmin();
        gA
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.admin = data.response;
					
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
			
		var getPage = Category.getPage;
        var gP = new getPage();
        gP
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.pages = data.response.pages;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        var getCart = Cart.getCart;
        var gC = new getCart();
        gC
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.carts = data.response;
                    var total = 0;
                    data.response.forEach(function(product) {
                        total += product.product_id.pricing.after_discount * product.product_quantity;
                    });
                    _this.totalprice = total;
					_this.pageLoading=false;
                }
				else
				{
					sessionService.destroy('token');
					sessionService.destroy('user');
					sessionService.destroy('user_token');
					$location.path("#/login");
				}
            }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })


        this.searchP = function() {
            $location.path("search").search({
                q: _this.srch.name
            });
        }

        this.searchPs = function() {
            var searchProduct = search.searchProduct;
            var Search = new searchProduct();
            Search.$get({
                name: $routeParams.q,
				limit:100
            },function(data) {
                if (data.status == "success") {
                    _this.products = data.response.product;

                } else {
                    _this.error = data;
                }
            });
        }
		
		

        this.removeCart = function(pid) {
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
                                    ship += product.product_id.shipping_details.fee;
                                });
                                $scope.header.totalprice = total;
                                _this.totalprice = total;
                                _this.shipprice = ship;
                                _this.overprice = ship + total;
                            }
                        })
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }



        var getCategory = Category.getCategory;
        var gC = new getCategory();
        gC
            .$get(function(data) {
                if (data.status == "success") {
                    _this.category = data.response.categories;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })


        this.categorySearch = function() {
            var CProduct = new Product.cateProduct();
            CProduct
                .$get({
                category: $routeParams.cid,
				limit:100
            },function(data) {
                    if (data.status == "success") {
                        _this.products = data.response.product;
                        _this.cate = data.response.category;
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
		
		this.topProd = function () {
		var getPopular = Product.getPopular;
			var gp = new getPopular();
			gp
				.$get(function(data) {
					if (data.status == "success") {
						 var top_product = data.response.product;
                    for (var i = 0; i < top_product.length; i++) {
                        var item = top_product[i];
                        top_product[i].totalOffer = ((item.pricing.original - item.pricing.after_discount) / item.pricing.original) * 100;
                    }
						_this.popular = top_product;
						
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
		}
		
				
        this.priceSearch = function() {
            var searchPriceProduct = search.searchPriceProduct;
            var Search = new searchPriceProduct();
            Search.$get({
                category: $routeParams.id,
                lprice: $('#minp').val(),
                hprice: $('#maxp').val(),
				limit:100
            }, function(data) {
                if (data.status == "success") {
                    _this.products = data.response.product;
                } else {
                    _this.error = data;
                }
            });
        }

        if ($routeParams.cid != undefined){
            this.categorySearch();
			this.topProd();
		}

        if ($routeParams.q != undefined){
            this.searchPs();
			this.topProd();
		}

        $scope.$on('ngRepeatFinisheds', function(ngRepeatFinishedEvent) {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 10000,
                values: [0, 1000],
                slide: function(event, ui) {
                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                    $("#minp").val(ui.values[0]);
                    $("#maxp").val(ui.values[1]);
                }
            });
            $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
            $("#minp").val($("#slider-range").slider("values", 0));
            $("#maxp").val($("#slider-range").slider("values", 1));
        });
		

    }])
	.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });