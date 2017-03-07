'use strict';

/**
 * @ngdoc directive
 * @name eCommerceAdminApp.directive:partials
 * @description
 * # partials
 */
angular.module('eCommerceAdminApp')
  .directive('headerBar', function() {
    return {
      templateUrl: 'partials/headerbar.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('sideBar', function() {
    return {
      templateUrl: 'partials/sidebar.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('footerBar', function() {
    return {
      templateUrl: 'partials/footer.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('logOutButton', function() {
    var html = '<div class="pull-right">' +
      '<a href="javascript:void(0)" ng-click="LC.logout()" class="btn btn-default btn-flat">Sign out</a>' +
      '</div>';
    return {
      template: html,
      restrict: 'E',
      controller: 'LoginCtrl',
      controllerAs: 'LC',
    };
  })
