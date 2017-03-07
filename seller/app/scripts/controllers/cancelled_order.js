'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:CancelledOrderCtrl
 * @description
 * # CancelledOrderCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('CancelledOrderCtrl',['$scope','$http','url','sellers','$window','order', function($scope,$http,url,sellers,$window,order) {

      new order({status:"Cancelled"}).$get(function(data){
          console.log(data);
        //  $scope.orders =data.data.Resource;
        if(data["status"]=="success"){
          $scope.orders = data["response"]["orders"];

        }
      },function(data){

      });
  }]);
