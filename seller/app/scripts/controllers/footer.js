'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('FooterCtrl',['$scope','$http','url','sellers','$window', function($scope,$http,url,sellers,$window) {
    var configurations = url +'api/v1/pages';
    $http.get(configurations).success(function(data){
       if(data['status']=='success'){
         $scope.pages = data['response']['pages'];

       }
    });

  }]);
