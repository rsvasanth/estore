'use strict';


/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the ecommercesellerApp
 */


angular.module('ecommercesellerApp')
  .controller('HeadersCtrl', ['$scope','$window','$location','url','sellers','$http', function($scope, $window,$location,url,sellers,$http) {
    var authorization = $window.localStorage['Authorization'];
    $scope.shopper_details =false;

    if(!authorization){
        $location.path('signin');
    }


    var main_url =url+sellers+"get-profile";
    var req = {
       method: 'GET',
       url:main_url,
       headers: {
           'Authorization':$window.localStorage['Authorization']
       },
     }
     $http(req).then(function(data){
       if(data.data.status =='success'){

         $scope.sellers = data.data.response;

         if(data.data.response.logo){
            $scope.logo_show =data.data.response.logo.url;
         }else{
             $scope.logo_show ="http://ecommerce.provenlogic.xyz/default_images/logo.png";
         }
         if(data.data.response.banner){
           $scope.banner_show=data.data.response.banner.url;
         }else{
           $scope.banner_show="http://ecommerce.provenlogic.xyz/default_images/logo.png";
         }

         $scope.global_name=$scope.sellers.name;
         $scope.global_logo=$scope.logo_show;
         $window.localStorage['global_name']=$scope.sellers.name;
         $window.localStorage['global_logo']=$scope.logo_show;
         console.log($window.localStorage['global_logo']);


       }

     });
    $scope.global_name =$window.localStorage['global_name'];
    $scope.global_logo=$window.localStorage['global_logo'];

    $scope.logout =function(){
      localStorage.removeItem('global_name');
      localStorage.removeItem('Authorization');
      localStorage.removeItem('global_logo');
      localStorage.removeItem('forgot_password');
      localStorage.removeItem('sign_in_check');
      $location.path('seller');

    }

  }]).controller('DashboardCtrl', ['$scope','$http','$location','$window','url','sellers','imageUpload','saveImage', function($scope,$http,$location,$window,url,sellers,imageUpload,saveImage) {


    var authorization = $window.localStorage['Authorization'];

    if(!authorization){
        $location.path('signin');
    }
    var main_url =url+sellers+"get-profile";
    var req = {
       method: 'GET',
       url:main_url,
       headers: {
           'Authorization':authorization
       },
     }
     $http(req).then(function(data){
       if(data.data.status =='success'){

         $scope.sellers = data.data.response;
         $scope.address = data.data.response.address.address;
         $scope.phone =data.data.response.address.phone;
         $scope.city =data.data.response.address.city;
         $scope.pincode =data.data.response.address.pincode;
         $scope.state=data.data.response.address.state;
         $scope.country=data.data.response.address.country;
         if(data.data.response.logo){
            $scope.logo_show =data.data.response.logo.url;
         }else{
             $scope.logo_show ="http://ecommerce.provenlogic.xyz/default_images/logo.png";
         }
         if(data.data.response.banner){
           $scope.banner_show=data.data.response.banner.url;
         }else{
           $scope.banner_show="http://ecommerce.provenlogic.xyz/default_images/logo.png";
         }
         $scope.govt_issue_card_show=data.data.response.govt_issue_card.url;
         $scope.global_name=$scope.sellers.name;
         $scope.global_logo=$scope.logo_show;
         $window.localStorage['global_name']=$scope.sellers.name;
         $window.localStorage['global_logo']=$scope.logo_show;


       }

     });

//Saving shoppers details
    $scope.shop_details = function (){
      var new_url  = url+sellers+'update-profile';
      var authorization = $window.localStorage['Authorization'];

     var req = {
         method: 'POST',
         url: new_url,
         headers: {
             'Authorization':authorization
         },
         data: {"name":$scope.sellers.name,"email":$scope.email,"address":$scope.address,"password":$scope.password,"phone":$scope.phone,"city":$scope.city,"state":$scope.state,"country":$scope.country,"pincode":$scope.pincode,"business_registration":$scope.sellers.business_registration}
       }
       $http(req).then(function(data){
           if(data.data.status =="success"){
             $scope.shopper_details =true;
             $scope.message ="Shop Details Updated Successfully";
             setTimeout(function() {

             $('#mydiv').fadeOut('fast');
           }, 5000);
           }else{
             alert("Server error");
           }
       });
    }

    $scope.uploadFile = function(selection){

      var file = $scope[selection];

      var uploadUrl=url+"api/v1/images/upload-single-image";
      imageUpload.uploadFileToUrl(file, uploadUrl,selection,function(image){
          $scope.shopper_details =true;
        if(selection == 'logo'){


          $scope.logo_show=image;
          $scope.global_logo=image;
          $window.localStorage['global_logo']=image;
          $scope.message ="Logo Updated Successfully";


        }else if (selection == 'govt_issue_card') {
          $scope.govt_issue_card_show=image;
          $scope.message ="Govt issue card Updated Successfully";
        }
        else{
          $scope.banner_show=image;
          $scope.message ="Banner Updated Successfully";
        }

        setTimeout(function() {

        $('#mydiv').fadeOut('fast');
      }, 5000);
            $(window).scrollTop(0);

      });
  };


  }]).directive("w3TestDirective", function() {
      return {
          templateUrl : "views/templates/header.html",
          controller:"HeadersCtrl"
      };
  }).directive("sidebar", function() {
      return {
          templateUrl : "views/templates/sidebar.html",
          controller:"HeadersCtrl"
      };
  }).directive('fileModel', ['$parse', function ($parse) {
              return {
                 restrict: 'A',
                 link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function(){
                       scope.$apply(function(){
                          modelSetter(scope, element[0].files[0]);
                       });
                    });
                 }
              };
}]).service('imageUpload', ['$http','saveImage', function ($http,saveImage) {
            this.uploadFileToUrl = function(file, uploadUrl,selection,cb){
              var fd = new FormData();
              fd.append('image', file);


              $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
              })

              .success(function(data){
               if(data['status'] == 'success'){
                 var image_id = data.response._id;
                // $scope.logo_show = data.response.url;
                 saveImage(image_id,selection);
                 cb(data.response.url);
               }
              })

              .error(function(data){
                console.log(data);
              });
            }
 }]).service('saveImage', ['$http','$window','url','sellers','$location', function ($http,$window,url,sellers,$location) {

   return function(id,selection) {


     if(selection =='logo'){
          var logo_banner ={'logo':id};
     }
     if(selection =='banner'){

         var logo_banner ={'banner':id};
     }
     if(selection == 'govt_issue_card'){
       var logo_banner = {'govt_issue_card':id}
     }

    var new_url  = url+sellers+'update-profile';
    var authorization = $window.localStorage['Authorization'];

    var req = {
        method: 'POST',
        url: new_url,
        headers: {
            'Authorization':authorization
        },
        data: logo_banner,
      }
      $http(req).then(function(data){
          if(data.data.status =="success"){
          }else{
            alert("Upload failed");
          }
      });

   }

  }]);
