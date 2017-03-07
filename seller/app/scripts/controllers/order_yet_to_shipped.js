'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderYetToShippedCtrl
 * @description
 * # OrderYetToShippedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderYetToShippedCtrl', ['$scope','$http','url','sellers','$window','$location', function($scope,$http,url,sellers,$window,$location) {
    var authorization = $window.localStorage['Authorization'];
    //7wvobahx7dlftkzwzztbq8semi5mvh4o

    $scope.view_single_product = function(id){
      $location.path('/view_single_product/'+id);
    }
    if(!authorization){
        $location.path('signin');
    }

      var main_url = url+sellers+"tracking/getStatus?status=Yet To Be Shipped";
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

      $scope.track_status = function (id,product,status,tracking){

        if(tracking){
          tracking = tracking;
        }else{
          tracking=0;
        }
        var message ="";
        if (status =='Schedule Pickup') {
          status ='Pick Up Scheduled';

          message ='This order has been moved to "Pickup Scheduled" Tab';
        }else if (status =='Shipped') {

          message ='The product has been pickedup for shipping. Listing moved to "Shipped" Tab'
        }else if(status =='Delivered'){
          message ='The Product has been delivered successfully! The listing has been moved to the "Delivered" Tab';

        }else{

        }

        var new_url = url+sellers+"tracking/update/"+id+"/"+product+"?status="+status;
        var authorization = $window.localStorage['Authorization'];
        var req = {
           method: 'PUT',
           url: new_url,
           headers: {
               'Authorization':authorization
           },
           data:{"tracking_number":tracking}

         }
         $http(req).then(function(data){
           console.log(data);
             if(data.data.status =="success"){
               $("#"+id).remove();
               $("#toggle").removeClass('toggle');
               $("#message").html(message);


             }else{
               alert("Server error");
             }
         });


      }
  }]);
