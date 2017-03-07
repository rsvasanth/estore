'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CategoriesEditCtrl
 * @description
 * # CategoriesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CategoriesEditCtrl', [
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(Category, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Categories";
      _this.sub_title = "Edit Sub Categories";
      var getSingleCategory = Category.getSingleCategory;
      Category.getSingleCategory({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.category = data.response.category;
          _this.category.parent = _this.category.parent_id ? _this.category.parent_id._id: "";
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
        var category = angular.copy(_this.category);
        category.parent_id = _this.category.parent;
        Category.updateCategory({
          id: $routeParams.id
        }, category, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "updated Successfully",
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
        console.log(resp)
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        _this[name + "ProgressPercentage"] = progressPercentage;
      });
    }
  }]);
