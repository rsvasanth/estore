'use strict';

/**
 * @ngdoc service
 * @name ecommercesellerApp.auth
 * @description
 * # auth
 * Service in the ecommercesellerApp.
 */
angular.module('ecommercesellerApp')
  .service('auth', (['$resource','$window', function($resource,$window) {
    this.unauth = function () {
        alert("You have been Login By Other Account.");
    };
}]));
