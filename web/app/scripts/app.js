'use strict';

/**
 * @ngdoc overview
 * @name eCommerceUserApp
 * @description
 * # eCommerceUserApp
 *
 * Main module of the application.
 */
angular
  .module('eCommerceUserApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    '720kb.socialshare',
    'ngImgCrop',
  ])
  .constant({
    'endpoint': 'http://45.55.165.182:3000/api/v1',
    'dpath': 'http://the-symbol.net/#/',
    'seller': 'http://the-symbol.net:9000/#/'
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'Main',
      })
	  .when('/page/:pageid', {
        templateUrl: 'views/page.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LC'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'RC'
      })
      .when('/confirmation/:id', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LC'
      })
      .when('/newpassword/:id', {
        templateUrl: 'views/newpassword.html',
        controller: 'ForgotCtrl',
        controllerAs: 'FC'
      })
      .when('/forgotpassword', {
        templateUrl: 'views/forgotpassword.html',
        controller: 'ForgotCtrl',
        controllerAs: 'FC'
      })
      .when('/search', {
        templateUrl: 'views/products.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC'
      })
      .when('/search/category/:cid', {
        templateUrl: 'views/cate-products.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC'
      })
       .when('/product/:pid', {
        templateUrl: 'views/product_details.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC'
      })
      .when('/shop/:sid', {
        templateUrl: 'views/shop_details.html',
        controller: 'ShopCtrl',
        controllerAs: 'shopC'
      })
       .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC'
      })
       .when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        controllerAs: 'shopC'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl',
        controllerAs: 'Main'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart',
		requireAuth: true
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout',
		requireAuth: true
      })
      .when('/order', {
        templateUrl: 'views/order.html',
        controller: 'OrderCtrl',
        controllerAs: 'order',
		requireAuth: true
      })
      .when('/success', {
        templateUrl: 'views/success.html',
        controller: 'PaymentCtrl',
        controllerAs: 'pay',
		requireAuth: true
      })
      .when('/notify', {
        templateUrl: 'views/notify.html',
        controller: 'NotifyCtrl',
        controllerAs: 'notify',
		requireAuth: true
      })
      .when('/cancel', {
        templateUrl: 'views/cancel.html',
        controller: 'PaymentCtrl',
        controllerAs: 'pay',
		requireAuth: true
	  })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'acc',
		requireAuth: true
      })
      .when('/changepassword', {
        templateUrl: 'views/changepassword.html',
        controller: 'AccountCtrl',
        controllerAs: 'acc',
		requireAuth: true
      })
      .when('/review-product/:pid/:oid', {
        templateUrl: 'views/product_details.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC',
		requireAuth: true
      })
      .when('/return-product/:pid/:oid', {
        templateUrl: 'views/return_product.html',
        controller: 'ReturnCtrl',
        controllerAs: 'ReturnC',
		requireAuth: true
      })
      .when('/track-product/:pid/:oid', {
        templateUrl: 'views/tracking.html',
        controller: 'ReturnCtrl',
        controllerAs: 'ReturnC',
		requireAuth: true
      })
      .when('/rss', {
        templateUrl: 'views/rss.html',
        controller: 'RssCtrl',
        controllerAs: 'rss'
      })
      .otherwise({
        redirectTo: '/login'
      });

  })
  .run(['$rootScope', '$location', 'sessionService', '$http', function($rootScope, $location, sessionService, $http) {
    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
		 $http.defaults.headers.common['Authorization'] = sessionService.get('user_token');
		if(sessionService.get("token")==null)
		 {
			 var d = new Date().getTime();
			if(window.performance && typeof window.performance.now === "function"){
				d += performance.now(); //use high-precision timer if available
			}
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (d + Math.random()*16)%16 | 0;
				d = Math.floor(d/16);
				return (c=='x' ? r : (r&0x3|0x8)).toString(16);
			});
			sessionService.set("token",uuid);
		 }
	   if (newUrl.requireAuth && !sessionService.get('user')) {
        event.preventDefault();
        $location.path('/login');
      }
      if(newUrl.controller == "LoginCtrl" && sessionService.get('user')) {
        event.preventDefault();
        $location.path('/');
      }
    });
  }]);
