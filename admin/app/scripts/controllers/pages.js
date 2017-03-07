'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PagesCtrl
 * @description
 * # PagesCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PagesCtrl', ["pages", function (pages) {
    var _this = this;
    _this.title = "View Pages";
    pages.query(function(data) {
      if(data.status == "success") {
        _this.pages = data.response.pages;
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
    _this.remove = function (id, index) {
      pages.remove({id:id}, {}, function(data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.pages.splice(index, 1);
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
