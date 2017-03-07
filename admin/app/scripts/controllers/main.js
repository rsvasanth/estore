'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('MainCtrl', ['sessionService', function (sessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  }]);
