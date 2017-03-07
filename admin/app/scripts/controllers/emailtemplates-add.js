'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EmailtemplatesAddCtrl
 * @description
 * # EmailtemplatesAddCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EmailtemplatesAddCtrl', [
    'emailtemplates',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(emailtemplates, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Add Email Templates";
      _this.saveEmailTemplates = function() {
        emailtemplates.create({}, _this.emailtemplate, function(data) {
          if (data.status == "success") {
            _this.emailtemplate = "";
            _this.notify = {
              message: "Updated Succesfully",
              status: data.status,
              type: "success"
            }
          } else {
            _this.notify = {
              message: data.statusMessage,
              status: data.status,
              type: "danger"
            }
          }
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
    }
  ]);
