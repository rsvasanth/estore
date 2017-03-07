
'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the ecommercesellerApp
 */





angular.module('ecommercesellerApp')
  .controller('SigninCtrl', ['$scope','$http','$location','$window','url','sellers','$cookieStore', function($scope,$http,$location,$window,url,sellers,$cookieStore) {
      $scope.sign_checked = false;
      $scope.error_message=false;

      var configurations = url +'api/v1/admin/settings';
      $http.get(configurations).success(function(data){
         if(data['status']=='success'){
           console.log(data['response']['fav_icon']['url']);

           $scope.favicon=data['response']['fav_icon']['url'];
          $("#favicon").attr({href:$scope.favicon});

         }
      });
    if($window.localStorage['sign_in_check'] == 'true'){
      $scope.sign_checked = true;
        $scope.signin_message ="Great! Please sign-in to start selling Note: - A verification email has been sent to your registered email ID.- You can start uploading products. But only after verification will your shop go live. This step is essential for critical sales emails to reach you on time. Everytime.";

    }else{
        $scope.sign_checked = false;
    }
    if($window.localStorage["forgot_password"]=='true'){
      $scope.sign_checked = true;
      $scope.signin_message ="Please check your Email";
    }


    $scope.submit = function () {
      $window.localStorage['sign_in_check'] = "false";
      $window.localStorage['forgot_password'] = 'false';
      var main_url = url+sellers+"login";
      $http.post(main_url,{"email":$scope.email,"password":$scope.password}).success(function(data){
        if (data['status'] == 'success') {
           $window.localStorage['Authorization']=data['response']['token'];
           $scope.favicon ="images/main.png";
            $location.path('/yet_to_be_approved');



        }else{
          if(data["statusCode"]==500){
              if(data["statusMessage"]=="Invalid Password"){
                alert("Please enter the correct Password");
                  $scope.error_message=true;
                  console.log($scope.error_message);
              }
              if(data["statusMessage"]=='Invalid Mail'){
                alert("Please enter the Correct Email Id");
              }
          }else{
              alert("Server Error");
          }
        }
      });

    }


  }]);
