'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('LoginCtrl', ['AdminAuth', 'sessionService', '$location', function (AdminAuth, sessionService, $location) {
    var _this = this;
    this.loginAsAdmin = function () {
      var Admin = new AdminAuth(_this.login);
      Admin.$login().then(function(data) {
        if(data.status == "success") {
          sessionService.set('token', data.response.token);
          sessionService.set('user', JSON.stringify(data.response));
          $location.path("/");
        }
        else {
          _this.error = data.statusMessage;
        }
      });
    }
    this.logout = function () {
      sessionService.destroy('token');
      $location.path("/login");
    }
  }]);
