'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ViewSingleProductCtrl
 * @description
 * # ViewSingleProductCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ViewSingleProductCtrl', ['$scope','$http','url','sellers','$window','$routeParams', function($scope,$http,url,sellers,$window,$routeParams) {
    var new_url  = url+'api/v1/sellers/orders/'+$routeParams.id;
    var authorization = $window.localStorage['Authorization'];
    var req = {
       method: 'Get',
       url: new_url,
       headers: {
           'Authorization': authorization
       }
     }
     $http(req).then(function(data){
       if(data.data.status =="success"){
         $scope.order =data.data.response.orders;
         console.log(data.data.response.orders);
       }
        // $scope.order = data.data.response.order;
        // console.log($scope.order);
     });
 }]);
