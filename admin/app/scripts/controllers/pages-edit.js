'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PagesEditCtrl
 * @description
 * # PagesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PagesEditCtrl', [
    'pages',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(pages, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Edit Pages";
      pages.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.page = data.response.page;
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
      _this.savePage = function() {
        pages.update({
          id: $routeParams.id
        }, _this.page, function(data) {
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
