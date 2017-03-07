'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EmailtemplatesCtrl
 * @description
 * # EmailtemplatesCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EmailtemplatesCtrl', ["emailtemplates", function(emailtemplates) {
    var _this = this;
    _this.title = "View Email Templates";
    emailtemplates.query(function(data) {
      if (data.status == "success") {
        _this.emailtemplates = data.response.email_templates;
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

    _this.remove = function (id, index) {
      emailtemplates.remove({id:id}, {}, function(data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.emailtemplates.splice(index, 1);
        }
        else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function (data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }]);
