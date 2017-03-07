'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EmailtemplatesEditCtrl
 * @description
 * # EmailtemplatesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EmailtemplatesEditCtrl', [
    'emailtemplates',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(emailtemplates, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Edit Email Templates";
      emailtemplates.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.emailtemplate = data.response.email_template;
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
      _this.saveEmailTemplates = function() {
        emailtemplates.update({
          id: $routeParams.id
        }, _this.emailtemplate, function(data) {
          if (data.status == "success") {
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
