'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:InactiveProductsCtrl
 * @description
 * # InactiveProductsCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('InactiveProductsCtrl',['$scope','$http','url','sellers','$window','$location','user_url', function($scope,$http,url,sellers,$window,$location,user_url) {
    var authorization = $window.localStorage['Authorization'];

    if(!authorization){
        $location.path('signin');
    }
    var inactive_product = url+sellers+"products/deactive-products";
    //alert( $window.localStorage['Authorization']);
    var authorization = $window.localStorage['Authorization'];

    $scope.edit_single_product = function(id) {
       $location.path('/edit_product/'+id);
    }

    var req = {
       method: 'GET',
       url:inactive_product,
       headers: {
           'Authorization':authorization
       },
     }
     $http(req).then(function(data){
       //console.log(data.data.status);
       $scope.inactive_product=data.data.response.products;
       $scope.user_url=user_url;


     });
     $scope.activate_single_product =function (id){
       var product_id = id;
       var new_url  = url+'api/v1/sellers/products/update-status/'+product_id+'/1';
       //var new_url  = url+'api/v1/sellers/products/delete/'+product_id;
       var authorization = $window.localStorage['Authorization'];
       //console.log($scope.paid_by);



      var req = {
          method: 'POST',
          url: new_url,
          headers: {
              'Authorization':authorization
          },
          data: {"is_active" :true}
        }
        $http(req).then(function(data){
            if(data.data.status =="success"){
            $("#"+id).remove();

            }else{
              alert("Server error");
            }
        });


     }
  }]);
