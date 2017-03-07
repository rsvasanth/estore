'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:logout
 * @description
 * # logout
 */
angular.module('eCommerceUserApp')
  .directive('logout', function () {
    return {
      template: '<a style="cursor:pointer;" ng-click="LC.logout()">Logout</a>',
      restrict: 'E',
	  controller: 'LoginCtrl',
      controllerAs: 'LC',
      restrict: 'E'
    };
  });
