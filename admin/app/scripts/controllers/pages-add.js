'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PagesEditCtrl
 * @description
 * # PagesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PagesAddCtrl', [
    'pages',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(pages, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Add Pages";
      _this.savePage = function() {
        pages.create({}, _this.page, function(data) {
          if (data.status == "success") {
            _this.page = "";
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
