'use strict';

/**
 * @ngdoc overview
 * @name eCommerceAdminApp
 * @description
 * # eCommerceAdminApp
 *
 * Main module of the application.
 */
angular
  .module('eCommerceAdminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'angular.filter'
  ])
  .constant({
    'endpoint': "http://45.55.165.182:3000/api/v1"//'http://45.55.165.182:3000/api/v1'//'http://ecommerce.provenlogic.xyz/api/v1'//"http://localhost:3000/api/v1"//'http://ecommerce.provenlogic.xyz/api/v1'
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        requireAuth: true
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        requireAuth: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LC'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC',
        requireAuth: true
      })
      .when('/product/:id', {
        templateUrl: 'views/product-edit.html',
        controller: 'ProductEditCtrl',
        controllerAs: 'ProdEdit',
        requireAuth: true
      })
      .when('/product/view/:id', {
        templateUrl: 'views/product-view.html',
        controller: 'ProductViewCtrl',
        controllerAs: 'ProdView',
        requireAuth: true
      })
      .when('/pages', {
        templateUrl: 'views/pages.html',
        controller: 'PagesCtrl',
        controllerAs: 'PagesCtrl',
        requireAuth: true
      })
      .when('/pages/:id', {
        templateUrl: 'views/pages-edit.html',
        controller: 'PagesEditCtrl',
        controllerAs: 'PagesEdit',
        requireAuth: true
      })
      .when('/add-pages', {
        templateUrl: 'views/pages-edit.html',
        controller: 'PagesAddCtrl',
        controllerAs: 'PagesEdit',
        requireAuth: true
      })
      .when('/emailtemplates', {
        templateUrl: 'views/emailtemplates.html',
        controller: 'EmailtemplatesCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/emailtemplates/:id', {
        templateUrl: 'views/emailtemplates-edit.html',
        controller: 'EmailtemplatesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-emailtemplates', {
        templateUrl: 'views/emailtemplates-edit.html',
        controller: 'EmailtemplatesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/categories/:id', {
        templateUrl: 'views/categories-edit.html',
        controller: 'CategoriesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/edit-sub-categories/:id', {
        templateUrl: 'views/sub-categories-edit.html',
        controller: 'CategoriesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-categories', {
        templateUrl: 'views/categories-edit.html',
        controller: 'CategoriesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-sub-categories', {
        templateUrl: 'views/sub-categories-edit.html',
        controller: 'CategoriesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-users', {
        templateUrl: 'views/users-edit.html',
        controller: 'UsersAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/users/:id', {
        templateUrl: 'views/users-edit.html',
        controller: 'UsersEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/profile/:id', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/change-password', {
        templateUrl: 'views/change-password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/configuration', {
        templateUrl: 'views/site-configuration.html',
        controller: 'SiteConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/main-banner', {
        templateUrl: 'views/main-banner.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/sub-banner', {
        templateUrl: 'views/sub-banner.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/home-page-images', {
        templateUrl: 'views/home-page-images.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/finance', {
        templateUrl: 'views/finance.html',
        controller: 'FinanceCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/finance/:id', {
        templateUrl: 'views/finance-single.html',
        controller: 'FinanceSingleCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .otherwise({
        redirectTo: '/login'
      });

  })
  .run(['$rootScope', '$location', 'sessionService', function($rootScope, $location, sessionService) {
    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
      if (newUrl.requireAuth && !sessionService.get('token')) {
        event.preventDefault();
        $location.path('/login');
      }
      if(newUrl.controller == "LoginCtrl" && sessionService.get('token')) {
        event.preventDefault();
        $location.path('/');
      }
    });
  }]);
