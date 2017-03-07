'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('MainCtrl', ['Product', 'Category', 'search', 'Main', 'Cart', "$location", "sessionService", "$scope", function(Product, Category, search, Main, Cart, $location, sessionService, $scope) {

        var _this = this;

        
        var getHome = Main.getHomepage;
        var gH = new getHome();
        gH
            .$get(function(data) {
                if (data.status == "success") {
                    _this.home = data.response;
					
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        var getTopProducts = Product.getTopProducts;
        var gTP = new getTopProducts();
        gTP
            .$get(function(data) {
                if (data.status == "success") {
                    var top_product = data.response.product;
                    for (var i = 0; i < top_product.length; i++) {
                        var item = top_product[i];
                        top_product[i].totalOffer = ((item.pricing.original - item.pricing.after_discount) / item.pricing.original) * 100;
                    }
                    _this.top_product = top_product;
					
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
		var getBestSeller = Product.getBestSeller;
			var gBS = new getBestSeller();
			gBS
				.$get(function(data) {
					if (data.status == "success") {
						 var top_product = data.response.product;
                    for (var i = 0; i < top_product.length; i++) {
                        var item = top_product[i];
                        top_product[i].totalOffer = ((item.pricing.original - item.pricing.after_discount) / item.pricing.original) * 100;
                    }
						_this.best_seller = top_product;
						
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
		var getBestOffer = Product.getBestOffer;
			var gBO = new getBestOffer();
			gBO
				.$get(function(data) {
					if (data.status == "success") {
						 var top_product = data.response.product;
                    for (var i = 0; i < top_product.length; i++) {
                        var item = top_product[i];
                        top_product[i].totalOffer = ((item.pricing.original - item.pricing.after_discount) / item.pricing.original) * 100;
                    }
						_this.best_offer = top_product;
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
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

        
        $scope.$on('ngRepeatFinishednivo', function(ngRepeatFinishedEvent) {
            $('#my-nivoslider').nivoSlider({
                effect: 'random',
                slices: 15,
                boxCols: 8,
                boxRows: 4,
                animSpeed: 500,
                pauseTime: 5000,
                startSlide: 0,
                directionNav: true,
                controlNavThumbs: true,
                pauseOnHover: false,
                manualAdvance: false
            });
        })
        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {


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
        $scope.$on('ngRepeatFinished6', function(ngRepeatFinishedEvent) {


            $(".active-items-6").owlCarousel({
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
        $scope.$on('ngRepeatFinished5', function(ngRepeatFinishedEvent) {


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
    }])
