'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ForgotPasswordCtrl',['$scope','$http','$location','$window','url','sellers', function($scope,$http,$location,$window,url,sellers) {
    $scope.forgot_message=false;
    $scope.master = {};

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };
    $scope.submit = function () {


        var main_url = url+sellers+"forgotpassword";
      $http.post(main_url,{"email":$scope.email}).success(function(data){
        if (data['status'] == 'success') {

          $window.localStorage['forgot_password']='true';

          $location.path('/signin');
        }else{
          if(data['statusMessage']=='Your mail id incorrect'){
            alert("Please enter correct mail id");
          }else{
            alert('Server error');
          }

        }
      });

    }

    $scope.reset();
  }]);
