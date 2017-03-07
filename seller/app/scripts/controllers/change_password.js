'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ChangePasswordCtrl', ['$scope','$http','$location','$window','url','sellers', function($scope,$http,$location,$window,url,sellers) {




    $scope.submit = function (){
      var new_url  = url+sellers+'update-profile';
      var authorization = $window.localStorage['Authorization'];

     var req = {
         method: 'POST',
         url: new_url,
         headers: {
             'Authorization':authorization
         },
         data: {"password":$scope.password}
       }
       $http(req).then(function(data){
           if(data.data.status =="success"){
             alert("Password Updated Successfully");
               $location.path('seller');

           }else{
             alert("no");
           }
       });
    }





  }]);
