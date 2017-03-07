'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CategoriesAddCtrl
 * @description
 * # CategoriesAddCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CategoriesAddCtrl',[
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(Category, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add Categories";
      _this.sub_title = "Add Sub Categories";
      _this.category = {};
      Category.getApprovedCategories({}, {}, function(data) {
        if (data.status == "success") {
          _this.categories = data.response.categories;
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

      _this.saveCategory = function() {
        Category.addSingle({}, _this.category, function(data) {
          if (data.status == "success") {
            _this.category = {};
            _this.notify = {
              message: "Created Successfully",
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
        })
      }
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          var data = resp.data;
          if (data.status == "success") {
            _this[name].image = data.response;
          } else {
            _this.notify = {
              message: data.statusMessage,
              status: data.status,
              type: "danger"
            }
          }
        }, function(resp) {
          var data = resp.data;
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      };
    }]);
