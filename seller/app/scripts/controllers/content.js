'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ContentCtrl', ['$scope','$http','url','sellers','$window','$routeParams', function($scope,$http,url,sellers,$window,$routeParams) {
    //console.log($routeParams.id);
    var configurations = url +'api/v1/pages/'+$routeParams.id;
    $http.get(configurations).success(function(data){
      console.log(data);
       if(data['status']=='success'){
             $scope.content = data['response']['page']['content'];

       }
    });
  }]);
