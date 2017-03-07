'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderReturnedCtrl
 * @description
 * # OrderReturnedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderReturnedCtrl',['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var authorization = $window.localStorage['Authorization'];

    $scope.view_single_product = function(id){
      $location.path('/view_single_product/'+id);
    }

    if(!authorization){
        $location.path('signin');
    }
      // new order({status:"Returned"}).$get(function(data){
      //     console.log(data);
      //   //  $scope.orders =data.data.Resource;
      //   if(data["status"]=="success"){
      //     $scope.orders = data["response"]["orders"];
      //
      //   }
      // },function(data){
      //
      // });
      var main_url = url+sellers+"tracking/getStatus?status=Returned";
      var req = {
         method: 'GET',
         url:main_url,
         headers: {
             'Authorization':authorization
         },
       }
       $http(req).then(function(data){
         if(data.data.status=="success"){
           console.log(data.data.response.orders);
            $scope.orders = data.data.response.orders;
          }

       });
  }]);
