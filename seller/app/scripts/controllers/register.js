'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ecommercesellerApp
 */



angular.module('ecommercesellerApp')
  .controller('RegisterCtrl', ['$scope','$http','url','sellers','$location','$window','business_registrationUpload','vcRecaptchaService', function($scope,$http,url,sellers,$location,$window,business_registrationUpload,recaptcha) {

    //Register user
    $scope.submit = function () {
      var main_url = url+sellers+"/register";

      var file = $scope['govt_issue_card'];
        var uploadUrl=url+"api/v1/images/upload-single-image";
        business_registrationUpload.uploadFileToUrl(file, uploadUrl,function(image){
          $window.localStorage['govt_issue_card']= image;
          $http.post(main_url,{"name":$scope.name,"email":$scope.email,"address":$scope.address,"password":$scope.password,"phone":$scope.phone,"city":$scope.city,"state":$scope.state,"country":$scope.country,"pincode":$scope.pincode,"govt_issue_card":$window.localStorage['govt_issue_card'],"business_registration":$scope.business_registration}).success(function(data){

            if(data['status'] == 'success'){
             $window.localStorage['sign_in_check']="true";
              $location.path('seller');
            }else{
               if(data['statusCode']== 500){
                 alert("Email-id already exist.Please try with other Email-id");
               }else{
                 alert("Server Error");
               }
            }
          });

      });
      console.log($window.localStorage['govt_issue_card']);

    }


  }]).service('business_registrationUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl,cb){
              var fd = new FormData();
              fd.append('image', file);


              $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
              })

              .success(function(data){
               if(data['status'] == 'success'){
                 var image_id = data.response._id;
                 cb(data.response._id);
               }
              })

              .error(function(data){
                alert("Server error");
              });
            }
 }]);
