'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:YetToBeApprovedCtrl
 * @description
 * # YetToBeApprovedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('YetToBeApprovedCtrl', ['$scope','$http','url','sellers','$window','$location','user_url', function($scope,$http,url,sellers,$window,$location,user_url) {
    //{{url}}/api/v1/products/get-non-approved-products
    var inactive_product = url+sellers+"products/non-approved-products";
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
       //console.log(data.data.status);
        $scope.user_url=user_url;
        $scope.yet_to_be_approved=data.data.response.products;

      //  }

     });
  }]);
