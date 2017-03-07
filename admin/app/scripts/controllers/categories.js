'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CategoriesCtrl', ["Category", "$scope", function (Category, $scope) {
    var _this = this;
    _this.title = "View Categories";
    Category.getAllCategories({}, {},function(data) {
      if(data.status == "success") {
        _this.categories = data.response.categories;
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
      Category.deleteSingle({id:id}, {}, function(data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.categories.splice(index, 1);
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
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
      });
    });
  }]);
