'use strict';

/**
 * @ngdoc overview
 * @name ecommercesellerApp
 * @description
 * # ecommercesellerApp
 *
 * Main module of the application.
 */
angular
  .module('ecommercesellerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'angularSpinners',
    'ckeditor',
    'vcRecaptcha',
    'ngImgCrop',
  ])
  .constant('url', 'http://45.55.165.182:3000/')
  .constant('user_url','http://the-symbol.net/')
  .constant('sellers','api/v1/sellers/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/seller', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/header', {
        templateUrl: 'views/header.html',
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      })
      .when('/sidebar', {
        templateUrl: 'views/sidebar.html',
        controller: 'SidebarCtrl',
        controllerAs: 'sidebar'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/add_product', {
        templateUrl: 'views/add_product.html',
        controller: 'AddProductCtrl',
        controllerAs: 'addProduct'
      })
      .when('/edit_product/:id', {
        templateUrl: 'views/edit_product.html',
        controller: 'EditProductCtrl',
        controllerAs: 'editProduct'
      })

      .when('/update_sellers', {
        templateUrl: 'views/update_sellers.html',
        controller: 'UpdateSellersCtrl',
        controllerAs: 'updateSellers'
      })
      .when('/inactive_products', {
        templateUrl: 'views/inactive_products.html',
        controller: 'InactiveProductsCtrl',
        controllerAs: 'inactiveProducts'
      })
      .when('/out_of_stock_products', {
        templateUrl: 'views/out_of_stock_products.html',
        controller: 'OutOfStockProductsCtrl',
        controllerAs: 'outOfStockProducts'
      })
      .when('/yet_to_be_approved', {
        templateUrl: 'views/yet_to_be_approved.html',
        controller: 'YetToBeApprovedCtrl',
        controllerAs: 'yetToBeApproved'
      })
      .when('/order_pending', {
        templateUrl: 'views/order_pending.html',
        controller: 'OrderPendingCtrl',
        controllerAs: 'orderPending'
      })
      .when('/cancelled_order', {
        templateUrl: 'views/cancelled_order.html',
        controller: 'CancelledOrderCtrl',
        controllerAs: 'cancelledOrder'
      })
      .when('/track_order', {
        templateUrl: 'views/track_order.html',
        controller: 'TrackOrderCtrl',
        controllerAs: 'trackOrder'
      })

      .when('/order_yet_to_shipped', {
        templateUrl: 'views/order_yet_to_shipped.html',
        controller: 'OrderYetToShippedCtrl',
        controllerAs: 'orderYetToShipped'
      })
      .when('/order_pick_up', {
        templateUrl: 'views/order_pick_up.html',
        controller: 'OrderPickUpCtrl',
        controllerAs: 'orderPickUp'
      })
      .when('/order_shipped', {
        templateUrl: 'views/order_shipped.html',
        controller: 'OrderShippedCtrl',
        controllerAs: 'orderShipped'
      })
      .when('/order_delivered', {
        templateUrl: 'views/order_delivered.html',
        controller: 'OrderDeliveredCtrl',
        controllerAs: 'orderDelivered'
      })
      .when('/order_returned', {
        templateUrl: 'views/order_returned.html',
        controller: 'OrderReturnedCtrl',
        controllerAs: 'orderReturned'
      })
      .when('/change_password', {
        templateUrl: 'views/change_password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'changePassword'
      })
      .when('/forgot_password', {
        templateUrl: 'views/forgot_password.html',
        controller: 'ForgotPasswordCtrl',
        controllerAs: 'forgotPassword'
      })
      .when('/view_single_product/:id', {
        templateUrl: 'views/view_single_product.html',
        controller: 'ViewSingleProductCtrl',
        controllerAs: 'viewSingleProduct'
      })
      .when('/order_rejected', {
        templateUrl: 'views/order_rejected.html',
        controller: 'OrderRejectedCtrl',
        controllerAs: 'orderRejected'
      })
      .when('/footer', {
        templateUrl: 'views/footer.html',
        controller: 'FooterCtrl',
        controllerAs: 'footer'
      })
      .when('/content/:id', {
        templateUrl: 'views/content.html',
        controller: 'ContentCtrl',
        controllerAs: 'content'
      })
      .otherwise({
        redirectTo: '/seller',
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      });

  })
  .directive('deactiveLink', function () {
    return {
      template: '<button class="btn  btn-primary" ng-click="deactivate_product(id)">Deactivate</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        id: "="
      },
      controller: "ProductCtrl"
    }
  }).directive('deleteLink', function () {
    return {

      template: '<button class="btn  btn-primary" ng-click="delete_product(id)">Delete</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        id: "="
      },
      controller: "ProductCtrl"
    }
  }).directive('orderStatus', function () {
    return {

      template: '<button class="btn  btn-primary" ng-click="change_status(order,product,status)">{{status}}</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        product:"=",
        order:"=",
        status:"@status"
      },
      controller: "OrderPendingCtrl"
    }
  }).directive('trackStatus', function () {
    return {

      template: '<button class="btn  btn-primary" ng-click="track_status(order,product,status,tracking)">{{status}}</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        product:"=",
        order:"=",
        status:"@status",
        tracking:"="
      },
      controller: "OrderYetToShippedCtrl"
    }
  }).directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]).directive('fileModel', ['$parse', function ($parse) {
                return {
                   restrict: 'A',
                   link: function(scope, element, attrs) {
                      var model = $parse(attrs.fileModel);
                      var modelSetter = model.assign;

                      element.bind('change', function(){
                         scope.$apply(function(){
                            modelSetter(scope, element[0].files[0]);
                         });
                      });
                   }
                };
  }]);
