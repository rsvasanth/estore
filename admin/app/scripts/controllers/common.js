'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CommonCtrl', ["sessionService", function (sessionService) {
    var admin = JSON.parse(sessionService.get("user"));
    this.name = admin.name;
    this._id = admin._id;
  }]);
