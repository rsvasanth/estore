'use strict';

/**
 * @ngdoc directive
 * @name ecommercesellerApp.directive:albums
 * @description
 * # albums
 */
angular.module('ecommercesellerApp')
  .directive('albums', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the albums directive');
      }
    };
  });
