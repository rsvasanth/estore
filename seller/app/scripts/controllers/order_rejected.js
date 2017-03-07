'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderRejectedCtrl
 * @description
 * # OrderRejectedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderRejectedCtrl', ['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var new_url = url+sellers+"orders/getStatus?status=Rejected";;
    var authorization = $window.localStorage['Authorization'];

    var req = {
       method: 'GET',
       url: new_url,
       headers: {
           'Authorization':authorization
       },

     }
     $http(req).then(function(data){

         if(data.data.status =="success"){
              $scope.orders = data.data.response.orders;
              
              console.log($scope.orders._id);


         }else{

         }
     });
     $scope.view_single_product = function(id){
       $location.path('/view_single_product/'+id);
     }
  }]);
