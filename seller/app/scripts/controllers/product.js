'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ProductCtrl', ['$scope','$http','url','sellers','$window','$location','user_url', function($scope,$http,url,sellers,$window,$location,user_url) {
    //{{url}}/api/v1/products/get-non-approved-products
    //pi/v1/sellers/products/active-products
    var inactive_product = url+sellers+"products/active-products";
    //alert( $window.localStorage['Authorization']);

    var authorization = $window.localStorage['Authorization'];

    if(!authorization){
        $location.path('signin');
    }
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
       if(data.data.status == "success"){
         $scope.active_product=data.data.response.products;
         $scope.user_url=user_url;
       }
   });
   $scope.deactivate_product = function (id){
     if($window.confirm('Do you want to deactivate this product?')) {
       var product_id = id;
       var new_url  = url+'api/v1/sellers/products/update-status/'+product_id+"/"+0;
       var authorization = $window.localStorage['Authorization'];
       console.log($scope.paid_by);

      var req = {
          method: 'POST',
          url: new_url,
          headers: {
              'Authorization':authorization
          },
          data: {"is_active" :false}
        }
        $http(req).then(function(data){
            if(data.data.status =="success"){
              //alert("Yes");
                $("#"+id).remove();
                $("#product_visible").removeClass('product_visible');
                $("#product_message").html("Selected product has been Deactivated & moved to Inactive Tab");

            }else{
              alert("Server Error");
            }
        });
    }
   }
   $scope.delete_product = function (id){

      if($window.confirm('This is a permanent action. Do you want to delete this product?')) {
        var product_id = id;
        var new_url  = url+'api/v1/sellers/products/delete/'+product_id;
        var authorization = $window.localStorage['Authorization'];

       var req = {
           method: 'POST',
           url: new_url,
           headers: {
               'Authorization':authorization
           },
           data: {"is_active" :false}
         }
         $http(req).then(function(data){
             if(data.data.status =="success"){
             $("#"+id).remove();
             $("#product_visible").removeClass('product_visible');
             $("#product_message").html("Selected products have been deleted");


             }else{
               alert("Server error");
             }
         });
      } else {

      }


   }
 }]).directive("h", function() {
      return {
          templateUrl : "views/templates/header.html"
      };
  });
