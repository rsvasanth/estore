'use strict';

/**
 * @ngdoc directive
 * @name ecommercesellerApp.directive:albums
 * @description
 * # albums
 */
angular.module('ecommercesellerApp')
  .directive('deactiveLink', function () {
    return {
      template: '<button class="btn  btn-primary" ng-click="deactivate_product()">Deactivate ss[{{id}}]</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        id: "="
      }
      controller: "ProductCtrl"
    };
  });
