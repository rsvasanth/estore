'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderPendingCtrl
 * @description
 * # OrderPendingCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderPendingCtrl', ['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var authorization = $window.localStorage['Authorization'];
    $scope.toggle=false;
    if(!authorization){
        $location.path('signin');
    }
      // new order({status:"Not Approved"}).$get(function(data){
      //     console.log(data);
      //   //  $scope.orders =data.data.Resource;
      //   if(data["status"]=="success"){
      //     $scope.orders = data["response"]["orders"];
      //
      //   }
      // },function(data){
      //
      // });
      var new_url = url+sellers+"orders/getStatus?status=Not Approved";;
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
            

           }else{

           }
       });
       $scope.view_single_product = function(id){
         $location.path('/view_single_product/'+id);
       }
      // {{url}}/api/v1/sellers/orders/update/order_id/product_id?status=
      $scope.change_status = function (id,product,status){

        var message ="";
        if(status == 'Approve'){

          status ='Approved'
          message =' Product moved to "Track Orders" page.';
        }else if (status =='Reject') {
          status ='Rejected';
          message =' Product moved to "Rejected items Tab" page.';
          if($window.confirm('This is a permanent action. Do you want to Reject this Order?')) {

          }else{
            return;
          }
        }else{

        }

        var new_url = url+sellers+"orders/update/"+id+"/"+product+"?status="+status;
        var authorization = $window.localStorage['Authorization'];

        var req = {
           method: 'PUT',
           url: new_url,
           headers: {
               'Authorization':authorization
           },

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
