'use strict';

/**
 * @ngdoc overview
 * @name ecommercesellerApp
 * @description
 * # ecommercesellerApp
 *
 * Main module of the application.
 */
angular
  .module('ecommercesellerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'angularSpinners',
    'ckeditor',
    'vcRecaptcha',
    'ngImgCrop',
  ])
  .constant('url', 'http://45.55.165.182:3000/')
  .constant('user_url','http://the-symbol.net/')
  .constant('sellers','api/v1/sellers/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/seller', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/header', {
        templateUrl: 'views/header.html',
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      })
      .when('/sidebar', {
        templateUrl: 'views/sidebar.html',
        controller: 'SidebarCtrl',
        controllerAs: 'sidebar'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'product'
      })
      .when('/add_product', {
        templateUrl: 'views/add_product.html',
        controller: 'AddProductCtrl',
        controllerAs: 'addProduct'
      })
      .when('/edit_product/:id', {
        templateUrl: 'views/edit_product.html',
        controller: 'EditProductCtrl',
        controllerAs: 'editProduct'
      })

      .when('/update_sellers', {
        templateUrl: 'views/update_sellers.html',
        controller: 'UpdateSellersCtrl',
        controllerAs: 'updateSellers'
      })
      .when('/inactive_products', {
        templateUrl: 'views/inactive_products.html',
        controller: 'InactiveProductsCtrl',
        controllerAs: 'inactiveProducts'
      })
      .when('/out_of_stock_products', {
        templateUrl: 'views/out_of_stock_products.html',
        controller: 'OutOfStockProductsCtrl',
        controllerAs: 'outOfStockProducts'
      })
      .when('/yet_to_be_approved', {
        templateUrl: 'views/yet_to_be_approved.html',
        controller: 'YetToBeApprovedCtrl',
        controllerAs: 'yetToBeApproved'
      })
      .when('/order_pending', {
        templateUrl: 'views/order_pending.html',
        controller: 'OrderPendingCtrl',
        controllerAs: 'orderPending'
      })
      .when('/cancelled_order', {
        templateUrl: 'views/cancelled_order.html',
        controller: 'CancelledOrderCtrl',
        controllerAs: 'cancelledOrder'
      })
      .when('/track_order', {
        templateUrl: 'views/track_order.html',
        controller: 'TrackOrderCtrl',
        controllerAs: 'trackOrder'
      })

      .when('/order_yet_to_shipped', {
        templateUrl: 'views/order_yet_to_shipped.html',
        controller: 'OrderYetToShippedCtrl',
        controllerAs: 'orderYetToShipped'
      })
      .when('/order_pick_up', {
        templateUrl: 'views/order_pick_up.html',
        controller: 'OrderPickUpCtrl',
        controllerAs: 'orderPickUp'
      })
      .when('/order_shipped', {
        templateUrl: 'views/order_shipped.html',
        controller: 'OrderShippedCtrl',
        controllerAs: 'orderShipped'
      })
      .when('/order_delivered', {
        templateUrl: 'views/order_delivered.html',
        controller: 'OrderDeliveredCtrl',
        controllerAs: 'orderDelivered'
      })
      .when('/order_returned', {
        templateUrl: 'views/order_returned.html',
        controller: 'OrderReturnedCtrl',
        controllerAs: 'orderReturned'
      })
      .when('/change_password', {
        templateUrl: 'views/change_password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'changePassword'
      })
      .when('/forgot_password', {
        templateUrl: 'views/forgot_password.html',
        controller: 'ForgotPasswordCtrl',
        controllerAs: 'forgotPassword'
      })
      .when('/view_single_product/:id', {
        templateUrl: 'views/view_single_product.html',
        controller: 'ViewSingleProductCtrl',
        controllerAs: 'viewSingleProduct'
      })
      .when('/order_rejected', {
        templateUrl: 'views/order_rejected.html',
        controller: 'OrderRejectedCtrl',
        controllerAs: 'orderRejected'
      })
      .when('/footer', {
        templateUrl: 'views/footer.html',
        controller: 'FooterCtrl',
        controllerAs: 'footer'
      })
      .when('/content/:id', {
        templateUrl: 'views/content.html',
        controller: 'ContentCtrl',
        controllerAs: 'content'
      })
      .otherwise({
        redirectTo: '/seller',
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      });

  })
  .directive('deactiveLink', function () {
    return {
      template: '<button class="btn  btn-primary" ng-click="deactivate_product(id)">Deactivate</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        id: "="
      },
      controller: "ProductCtrl"
    }
  }).directive('deleteLink', function () {
    return {

      template: '<button class="btn  btn-primary" ng-click="delete_product(id)">Delete</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        id: "="
      },
      controller: "ProductCtrl"
    }
  }).directive('orderStatus', function () {
    return {

      template: '<button class="btn  btn-primary" ng-click="change_status(order,product,status)">{{status}}</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        product:"=",
        order:"=",
        status:"@status"
      },
      controller: "OrderPendingCtrl"
    }
  }).directive('trackStatus', function () {
    return {

      template: '<button class="btn  btn-primary" ng-click="track_status(order,product,status,tracking)">{{status}}</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        product:"=",
        order:"=",
        status:"@status",
        tracking:"="
      },
      controller: "OrderYetToShippedCtrl"
    }
  }).directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]).directive('fileModel', ['$parse', function ($parse) {
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:AddProductCtrl
 * @description
 * # AddProductCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('AddProductCtrl', ['$scope','$http','url','sellers','$window','fileUpload','$compile','$location','spinnerService','auth', function($scope,$http,url,sellers,$window,fileUpload,$compile,$location,spinnerService,auth) {
    var category_url = url+'api/v1/categories/get-approved-categories';
    var configurations = url +'api/v1/admin/settings';
    var cropped_url =url +'api/v1/images/upload-single-image';
    $('#cropped').prop('disabled', true);

    $scope.myImage='';
   $scope.myCroppedImage='';
   $scope.images=[];

   var handleFileSelect=function(evt) {
     $('#cropped').prop('disabled', false);
     var file=evt.currentTarget.files[0];
     var reader = new FileReader();
     reader.onload = function (evt) {
       $scope.$apply(function($scope){
         $scope.myImage=evt.target.result;
         $scope.image_temp = $scope.myCroppedImage;
         console.log($scope.image_temp);

       });
     };
     reader.readAsDataURL(file);
   };
   function urltoFile(url, filename, mimeType) {
         return (fetch(url)
           .then(function(res) {
             return res.arrayBuffer();
           })
           .then(function(buf) {
             return new File([buf], filename, {
               type: mimeType
             });
           })
         );
       }
   $scope.crop = function() {
     $scope.cropArea =false;
     spinnerService.show('booksSpinner');
     $('#cropped').prop('disabled', true);
         urltoFile($scope.myCroppedImage, 'a.png', 'image/png')
           .then(function(file) {
             var fd = new FormData();
             fd.append('image', file);
             $http.post(cropped_url, fd, {
                 transformRequest: angular.identity,
                 headers: {
                   'Content-Type': undefined
                 }
               })
               .success(function(data) {
                 console.log(data.response.url);
                 spinnerService.hide('booksSpinner');
                 $scope.cropArea =true;
                 $scope.images.push(data.response);
                 $scope.myImage='';
                $scope.myCroppedImage='';
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                if($scope.images.length ==4){
                    $scope.image_icon = false;
                }

               })
               .error(function(data, status) {
                 console.log(data);
               });
           })
       }

   angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

      $scope.image_icon = true;
      $scope.image_message=false;
      $scope.product_error=false;
      $scope.submit=true;
      $scope.si="";
      $scope.paid_by = 0;
      $scope.subcategory_visible=false;
      $scope.cropArea=true;

    //Fetching categories config
    $http.get(category_url).success(function(data){
        if(data['status']=='success'){
          $scope.category = data['response']['categories'];

        }
     });
     //Fetching setting config
     $http.get(configurations).success(function(data){
        if(data['status']=='success'){
          $scope.units = data['response']['units'];
          $scope.config_service_tax =data['response']['service_tax'];
          $scope.config_commission=data['response']['commission'];
          $scope.ships_in=data['response']['ships_in'];
          $scope.price_unit=data['response']['price_unit'];

        }
     });

      //images array
      $scope.images =[];
      console.log($scope.images);
      $scope.images_container =[];

    //Variant and Quantity
    $scope.choices = [];
     $scope.addNewChoice = function() {
       $scope.choices.push({"name":"","quantity":""});
      };

    $scope.removeChoice = function($index) {
      $scope.choices.splice($index,1);
    };

      //Sku validation from server
    $scope.sku_msg =false;
    $scope.sku_check = function (){
            var sku_url = url+"api/v1/products/isexist";
            $http.post(sku_url,{"sku":$scope.sku}).success(function(data){
              if(data["response"]["flag"]==true){
                $scope.sku_msg =true;

              }else{
                $scope.sku_msg =false;
              }

             });

    }

    //Fetching sub category
     $scope.sub_category = function () {


       if($scope.cat ==0){
         return;
       }
       var category_url = url+'api/v1/categories/get-approved-categories?parent_id='+$scope.cat;
        $http.get(category_url).success(function(data){

            $scope.subcategory = data['response']['categories'];

            //console.log($scope.subcategory[0].children.length);
            if($scope.subcategory[0].children.length !=0){
                $scope.subcategory_visible=true;
            }else{
                $scope.subcategory_visible=false;
            }

            $scope.sub_cat = "";

         });

     }
     // remove the images
     $scope.remove_image =function($index){

       $scope.images.splice($index,1);
       if($scope.images.length <5){
           $scope.image_icon = true;
       }

     }
     //Adding product
     $scope.submiting = function () {
       if($scope.images.length ==0){
         $scope.image_message= true;
          return;
       }

      //  if($scope.subcategory){
      //    if($scope.subcategory[0].children.length >0){
      //        $scope.product_error=true;
      //      $scope.error_message ="Please Select Subcategory!!";
      //        $(window).scrollTop(0);
      //      return;
       //
      //    }
      //  }

       var variant_quantity =$scope.choices;

       //variant_quantity = JSON.parse(variant_quantity);

       var sum=0;
       angular.forEach(variant_quantity,function(v,k){
          sum = sum + parseInt(v["quantity"]);
        });

      if(parseInt($scope.quantity) < sum){
        $scope.product_error=true;
        $scope.error_message ="Quantity should be same As variant Quantities!!";
          $(window).scrollTop(0);
        return;
      }

       var new_url  = url+'api/v1/products/add-product';
       var authorization = $window.localStorage['Authorization'];

       var req = {
          method: 'POST',
          url: new_url,
          headers: {
              'Authorization':authorization
          },
          data: {"terms_and_conditions":$scope.terms_and_conditions,"long_description":$scope.long_description,"meta":$scope.meta,"unit":$scope.unit,"images":$scope.images,"variants":variant_quantity,"quantity":$scope.quantity,"title":$scope.name,"name":$scope.name,"category":$scope.cat,"subcategory":$scope.sub_cat,'description':$scope.description,"sku":$scope.sku,"price":$scope.main_price,"selling_price":$scope.selling_price,"commission":$scope.commision,"service_tax":$scope.service_tax,"weight":$scope.weight,"shipping_fee":$scope.shipping_fee,"ship_duration":$scope.ship_duration,"paid_by":$scope.paid_by}
        }
        $http(req).success(function(data){
            if(data.data.status =="success"){
                $scope.submit=false;
              alert("Product Added Successfully");
            $location.path('yet_to_be_approved');
            }else{
              alert("Sever Error Please Add Again");
            }
          }).error(function(data,error){
            if(error == '401'){
              auth.unauth();
              $location.path('seller');
            }

          });
        }



  $scope.uploadFiles = function($file,selection){

    var file = $file;
    if(!file){
      $scope.image_message= true;
       return;
    }
    if ((file.type == 'image/jpeg') ||(file.type == 'image/jpg')||(file.type == 'image/png')||(file.type == 'image/gif')){

    }else{

      $scope.image_message= true;
       return;
    }

    spinnerService.show('booksSpinner');
    $scope.image_icon = false;
    var uploadUrl = url+"api/v1/images/upload-single-image";
    fileUpload.uploadFileToUrl(file, uploadUrl,selection,function(image){
      //console.log(image);

      if(image == -1){
          spinnerService.hide('booksSpinner');
          $scope.image_icon = true;
          $scope.product_error=true;
          $scope.error_message ="Error Connection!!File not uploaded";
            $(window).scrollTop(0);
        //  alert('Error Connection');
          return;
      }
      $scope.images.push(image);
      spinnerService.hide('booksSpinner');
         $scope.image_icon = true;
          if($scope.images.length ==4){
              $scope.image_icon = false;
          }
     });
  };

    $scope.calculate_price = function () {
      var main_price = $scope.main_price;
      var selling_price =$scope.selling_price;
      $scope.error="";
      if(selling_price){
        if(selling_price > main_price){
          $scope.error="Price after Discount should be less than Item Price";
          return;
        }
        var actual_commision =($scope.selling_price*$scope.config_service_tax)/100;
        $scope.commision=actual_commision;
        var service_tax =(actual_commision*$scope.config_commission)/100;
        $scope.service_tax=service_tax;
        var total_earn = actual_commision+service_tax;
        total_earn = $scope.selling_price-total_earn;
        $scope.total_earn =total_earn;



      }else{
        console.log("g");
        var actual_commision =($scope.main_price*$scope.config_service_tax)/100;
        $scope.commision=actual_commision;
        var service_tax =(actual_commision*$scope.config_commission)/100;
        $scope.service_tax=service_tax;
        var total_earn = actual_commision+service_tax;
        total_earn = $scope.main_price-total_earn;
        $scope.total_earn =total_earn;
      }
    }


  }]).service('fileUpload', ['$http','$compile', function ($http,$compile) {

            this.uploadFileToUrl = function(file, uploadUrl,selection,cb){
               var fd = new FormData();
               //console.log(file);
               fd.append('image', file);

               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })

               .success(function(data){
                if(data['status'] == 'success'){
                  var image_id = data.response._id;

                  var url_new = data.response.url;

                  cb(data.response);
                  //ib(url_new,image_id);
                }
               })

               .error(function(error,data){

                 console.log(data);
                 cb(data);
                 console.log("nik");
                 console.log(error);
               });
            }
 }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:CancelledOrderCtrl
 * @description
 * # CancelledOrderCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('CancelledOrderCtrl',['$scope','$http','url','sellers','$window','order', function($scope,$http,url,sellers,$window,order) {

      new order({status:"Cancelled"}).$get(function(data){
          console.log(data);
        //  $scope.orders =data.data.Resource;
        if(data["status"]=="success"){
          $scope.orders = data["response"]["orders"];

        }
      },function(data){

      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ChangePasswordCtrl', ['$scope','$http','$location','$window','url','sellers', function($scope,$http,$location,$window,url,sellers) {




    $scope.submit = function (){
      var new_url  = url+sellers+'update-profile';
      var authorization = $window.localStorage['Authorization'];

     var req = {
         method: 'POST',
         url: new_url,
         headers: {
             'Authorization':authorization
         },
         data: {"password":$scope.password}
       }
       $http(req).then(function(data){
           if(data.data.status =="success"){
             alert("Password Updated Successfully");
               $location.path('seller');

           }else{
             alert("no");
           }
       });
    }





  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:EditProductCtrl
 * @description
 * # EditProductCtrl
 * Controller of the ecommercesellerApp
 */

angular.module('ecommercesellerApp')
  .controller('EditProductCtrl',['$scope','$http','url','sellers','$window','$routeParams','editfileUpload','$compile','spinnerService','$location','auth', function($scope,$http,url,sellers,$window,$routeParams,editfileUpload,$compile,spinnerService,$location,auth) {
    var authorization = $window.localStorage['Authorization'];
    $('#cropped').prop('disabled', true);

    $scope.myImage='';
   $scope.myCroppedImage='';
   $scope.images=[];

   var handleFileSelect=function(evt) {
     $('#cropped').prop('disabled', false);
     var file=evt.currentTarget.files[0];
     var reader = new FileReader();
     reader.onload = function (evt) {
       $scope.$apply(function($scope){
         $scope.myImage=evt.target.result;
         $scope.image_temp = $scope.myCroppedImage;
         console.log($scope.image_temp);

       });
     };
     reader.readAsDataURL(file);
   };
   function urltoFile(url, filename, mimeType) {
         return (fetch(url)
           .then(function(res) {
             return res.arrayBuffer();
           })
           .then(function(buf) {
             return new File([buf], filename, {
               type: mimeType
             });
           })
         );
       }
   $scope.crop = function() {
     $scope.cropArea =false;
     spinnerService.show('booksSpinner');
     $('#cropped').prop('disabled', true);
         urltoFile($scope.myCroppedImage, 'a.png', 'image/png')
           .then(function(file) {
             var fd = new FormData();
             fd.append('image', file);
             $http.post('http://the-symbol.net:3000/api/v1/images/upload-single-image', fd, {
                 transformRequest: angular.identity,
                 headers: {
                   'Content-Type': undefined
                 }
               })
               .success(function(data) {
                 console.log(data.response.url);
                 spinnerService.hide('booksSpinner');
                 $scope.cropArea =true;
                 $scope.images.push(data.response);
                 $scope.myImage='';
                $scope.myCroppedImage='';
                  $scope.image_icon = false;
                  $("html, body").animate({ scrollTop: $(document).height() }, 1000);

               })
               .error(function(data, status) {
                 console.log(data);
               });
           })
       }

   angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    $scope.product_update =false;
    $scope.image_message=false;
    $scope.product_error =false;
      $scope.cropArea=true;
    if(!authorization){
        $location.path('signin');
    }
      $scope.images =[];
        $scope.image_icon = true;

    $scope.new_array={};
    $scope.choices = [];
    $scope.sku_msg =false;
    $scope.sku_check = function (){

            var sku_url = url+"api/v1/products/isexist";
            $http.post(sku_url,{"sku":$scope.sku}).success(function(data){
              if(data["response"]["flag"]==true){
                $scope.sku_msg =true;

              }else{
                $scope.sku_msg =false;
              }

             });

    }
    $scope.addNewChoice = function() {
      $scope.variants.push({"name":"","quantity":""});
     };

   $scope.removeChoice = function($index) {
       $scope.variants.splice($index,1);
   };
   $scope.uploadFiles = function($file,selection){

     var file = $file;
     if(!file){
       $scope.image_message= true;
        return;
     }
     if ((file.type == 'image/jpeg') ||(file.type == 'image/jpg')||(file.type == 'image/png')||(file.type == 'image/gif')){

     }else{

       $scope.image_message= true;
        return;
     }
      spinnerService.show('booksSpinner');
      $scope.image_icon = false;
     var uploadUrl = url+"api/v1/images/upload-single-image";
     editfileUpload.uploadFileToUrl(file, uploadUrl,selection,function(image){
       if(image == -1){
           spinnerService.hide('booksSpinner');
           $scope.image_icon = true;
           $scope.product_error=true;
           $scope.error_message ="Error Connection!!File not uploaded";
           $(window).scrollTop(0);
           return;
       }
     $scope.images.push(image);
     spinnerService.hide('booksSpinner');
        $scope.image_icon = true;
        if($scope.images.length ==4){
            $scope.image_icon = false;
        }
   });
 };

 $scope.remove_image =function($index){
   //$("#"+id).remove();
   $scope.images.splice($index,1);
   if($scope.images.length <5){
       $scope.image_icon = true;
   }

 }
var configurations = url +'api/v1/admin/settings';
   $http.get(configurations).success(function(data){
      if(data['status']=='success'){
        $scope.units = data['response']['units'];
        $scope.config_service_tax =data['response']['service_tax'];
        $scope.config_commission=data['response']['commission'];
        $scope.ships_in=data['response']['ships_in'];
        $scope.price_unit=data['response']['price_unit'];


      }
   });

    var category_url = url+'api/v1/categories/get-approved-categories';
    $scope.si="";
    $scope.donglee ="";
    var new_url  = url+'api/v1/products/get-single-product/'+$routeParams.id;
    var authorization = $window.localStorage['Authorization'];
    var req = {
       method: 'Get',
       url: new_url,
       headers: {
           'Authorization': authorization
       }
     }
     $http(req).then(function(data){
         if(data.data.status =="success"){

            $scope.product_details = data.data.response.product;
            $scope.title =data.data.response.product.title;

            $scope.main_price = data.data.response.product.pricing.original;
            $scope.selling_price=data.data.response.product.pricing.after_discount;
            $scope.commision=data.data.response.product.pricing.commission;
            $scope.service_tax= data.data.response.product.pricing.service_tax;
            $scope.shipping_fee =data.data.response.product.shipping_details.fee;
            $scope.product_id=data.data.response.product._id;
            $scope.sku=data.data.response.product.sku;
            $scope.quantity=data.data.response.product.quantity;
            $scope.description=data.data.response.product.description;
            $scope.variants =data.data.response.product.variants;
            $scope.images = data.data.response.product.images;
            $scope.images_container =$scope.images;
            $scope.meta=data.data.response.product.meta;
            $scope.long_description = data.data.response.product.long_description;

            $scope.weight = data.data.response.product.shipping_details.weight;
            $scope.selected_unit =data.data.response.product.shipping_details.unit;
            $scope.selected_duration=data.data.response.product.shipping_details.duration;
            $scope.terms_and_conditions =data.data.response.product.terms_and_conditions;
            $scope.product_details.selected_categories = [];
            $scope.product_details.categories.forEach(function(item){
            $scope.product_details.selected_categories.push(item._id);

            if($scope.selling_price){
              if($scope.selling_price > $scope.main_price){
                $scope.error="Price after Discount should be less than Item Price";
                console.log("fd");
                return;
              }
              var actual_commision =($scope.selling_price*$scope.config_service_tax)/100;
              $scope.commision=actual_commision;
              var service_tax =(actual_commision*$scope.config_commission)/100;
              $scope.service_tax=service_tax;
              var total_earn = actual_commision+service_tax;
              total_earn = $scope.selling_price-total_earn;
              $scope.total_earn =total_earn;



            }else{
              var actual_commision =($scope.main_price*$scope.config_service_tax)/100;
              $scope.commision=actual_commision;
              var service_tax =(actual_commision*$scope.config_commission)/100;
              $scope.service_tax=service_tax;
              var total_earn = actual_commision+service_tax;
              total_earn = $scope.main_price-total_earn;
              $scope.total_earn =total_earn;
            }
            })

            $scope.units.forEach(function(item) {
              if(item == $scope.selected_unit) {
                $scope.unit = item;

              }
            });
            $scope.ships_in.forEach(function(item) {
              if(item == $scope.selected_duration) {
                $scope.ship_duration = item;
                //$scope.test = $scope.selected_duration;
              }

            });


            $scope.product_details.selected_categories

            $http.get(category_url).success(function(data){
               if(data['status']=='success'){
                 $scope.category = data['response']['categories'];
                 $scope.category.forEach(function(item) {
                   if($scope.product_details.selected_categories.indexOf(item._id) !==-1) {
                     $scope.product_details.category = item._id;
                     $scope.sub_category();
                   }
                 })
               }
            });
            if(data.data.response.product.paid_by_buyer == false){

              $scope.me = true;
              $scope.buyer =false;
            }else{

              $scope.me = false;
              $scope.buyer =true;

            }

         }  else{
           alert("no");
         }
     });
     $scope.submiting = function () {

       if($scope.images.length ==0){
         $scope.image_message= true;
          return;
       }

       var variant_quantity =$scope.choices;
       //variant_quantity = JSON.parse(variant_quantity);
       var sum=0;
       angular.forEach(variant_quantity,function(v,k){
          sum = sum + parseInt(v["quantity"]);
        });
      console.log(sum);
      console.log($scope.quantity);
      if(parseInt($scope.quantity) < sum){
        $scope.product_error=true;
        $scope.error_message ="Quantity should be same As variant Quantities!!";
          $(window).scrollTop(0);

        return;
      }
       var product_id = $scope.product_id;
       var new_url  = url+'api/v1/products/update-product/'+product_id;
       var authorization = $window.localStorage['Authorization'];


      var req = {
          method: 'PUT',
          url: new_url,
          headers: {
              'Authorization':authorization
          },
          data: {"terms_and_conditions":$scope.terms_and_conditions,"long_description":$scope.long_description,"meta":$scope.meta,"images":$scope.images,"variants":$scope.variants,"quantity":$scope.quantity,"title":$scope.product_details.title,"name":$scope.title,"category":$scope.product_details.category,"subcategory":$scope.product_details.sub_category,'description':$scope.description,"sku":$scope.sku,"price":$scope.main_price,"selling_price":$scope.selling_price,"commission":$scope.commision,"service_tax":$scope.service_tax,"weight":$scope.weight,"shipping_fee":$scope.shipping_fee,"ship_duration":$scope.ship_duration,"paid_by":0}
        }
        $http(req).success(function(data){
            if(data.data.status =="success"){
              $scope.product_update =true;
            }else{
              alert("no");
            }
        }).error(function(data,error){
          if(error == '401'){
            auth.unauth();
            $location.path('seller');
          }

        });

     }

     $scope.calculate_price = function () {
       var main_price = $scope.main_price;
       var selling_price =$scope.selling_price;
       $scope.error="";
       if(selling_price){
         if(selling_price > main_price){
           $scope.error="Price after Discount should be less than Item Price";
           console.log("fd");
           return;
         }
         var actual_commision =($scope.selling_price*$scope.config_service_tax)/100;
         $scope.commision=actual_commision;
         var service_tax =(actual_commision*$scope.config_commission)/100;
         $scope.service_tax=service_tax;
         var total_earn = actual_commision+service_tax;
         total_earn = $scope.selling_price-total_earn;
         $scope.total_earn =total_earn;



       }else{
         var actual_commision =($scope.main_price*$scope.config_service_tax)/100;
         $scope.commision=actual_commision;
         var service_tax =(actual_commision*$scope.config_commission)/100;
         $scope.service_tax=service_tax;
         var total_earn = actual_commision+service_tax;
         total_earn = $scope.main_price-total_earn;
         $scope.total_earn =total_earn;
       }
     }
     $scope.sub_category = function () {

       if($scope.product_details.category ==0){
         return;
       }
       var category_url = url+'api/v1/categories/get-approved-categories?parent_id='+$scope.product_details.category;
        $http.get(category_url).success(function(data){
            $scope.subcategories = data['response']['categories'][0]["children"];
            //console.log($scope.subcategories);
            console.log(data['response']['categories'][0]["children"].length);
            if(data['response']['categories'][0]["children"].length ==0){
              $scope.subcategory_visible = false;
            }
            else{
              $scope.subcategory_visible = true;
            }

            $scope.subcategories.forEach(function(item){
              //console.log(item._id);
            //  console.log($scope.product_details.selected_categories);
              if($scope.product_details.selected_categories.indexOf(item._id) !==-1) {

                $scope.product_details.sub_category = item._id;
              }
            })

         });

     }
  }]).directive('fileModel', ['$parse', function ($parse) {
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
}]).service('editfileUpload', ['$http','$compile', function ($http,$compile) {

            this.uploadFileToUrl = function(file, uploadUrl,selection,cb,image_counter,ib){
               var fd = new FormData();
               //console.log(file);
               fd.append('image', file);

               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })

               .success(function(data){
                if(data['status'] == 'success'){
                  var image_id = data.response._id;

                  var url_new = data.response.url;

                  cb(data.response);

                }
               })

               .error(function(data){

                 cb(data);

               });
            }
 }]);

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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ForgotPasswordCtrl
 * @description
 * # ForgotPasswordCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ForgotPasswordCtrl',['$scope','$http','$location','$window','url','sellers', function($scope,$http,$location,$window,url,sellers) {
    $scope.forgot_message=false;
    $scope.master = {};

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };
    $scope.submit = function () {


        var main_url = url+sellers+"forgotpassword";
      $http.post(main_url,{"email":$scope.email}).success(function(data){
        if (data['status'] == 'success') {

          $window.localStorage['forgot_password']='true';

          $location.path('/signin');
        }else{
          if(data['statusMessage']=='Your mail id incorrect'){
            alert("Please enter correct mail id");
          }else{
            alert('Server error');
          }

        }
      });

    }

    $scope.reset();
  }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('HeaderCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderDeliveredCtrl
 * @description
 * # OrderDeliveredCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderDeliveredCtrl', ['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var authorization = $window.localStorage['Authorization'];

    $scope.view_single_product = function(id){
      $location.path('/view_single_product/'+id);
    }
    if(!authorization){
        $location.path('signin');
    }
      // new order({status:"Delivered"}).$get(function(data){
      //     console.log(data);
      //   //  $scope.orders =data.data.Resource;
      //   if(data["status"]=="success"){
      //     $scope.orders = data["response"]["orders"];
      //
      //   }
      // },function(data){
      //
      // });
      var main_url = url+sellers+"tracking/getStatus?status=Delivered";
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
  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderPickUpCtrl
 * @description
 * # OrderPickUpCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderPickUpCtrl', ['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var authorization = $window.localStorage['Authorization'];

    $scope.view_single_product = function(id){
      $location.path('/view_single_product/'+id);
    }
    if(!authorization){
        $location.path('signin');
    }
      // new order({status:"Pick Up Scheduled"}).$get(function(data){
      //     console.log(data);
      //   //  $scope.orders =data.data.Resource;
      //   if(data["status"]=="success"){
      //     $scope.orders = data["response"]["orders"];
      //
      //   }
      // },function(data){
      //
      // });
      var main_url = url+sellers+"tracking/getStatus?status=Pick Up Scheduled";
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

  }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderRejectedCtrl
 * @description
 * # OrderRejectedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderRejectedCtrl', ['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var new_url = url+sellers+"orders/getStatus?status=Rejected";;
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
              
              console.log($scope.orders._id);


         }else{

         }
     });
     $scope.view_single_product = function(id){
       $location.path('/view_single_product/'+id);
     }
  }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderReturnedCtrl
 * @description
 * # OrderReturnedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderReturnedCtrl',['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var authorization = $window.localStorage['Authorization'];

    $scope.view_single_product = function(id){
      $location.path('/view_single_product/'+id);
    }

    if(!authorization){
        $location.path('signin');
    }
      // new order({status:"Returned"}).$get(function(data){
      //     console.log(data);
      //   //  $scope.orders =data.data.Resource;
      //   if(data["status"]=="success"){
      //     $scope.orders = data["response"]["orders"];
      //
      //   }
      // },function(data){
      //
      // });
      var main_url = url+sellers+"tracking/getStatus?status=Returned";
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OrderShippedCtrl
 * @description
 * # OrderShippedCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OrderShippedCtrl',['$scope','$http','url','sellers','$window','order','$location', function($scope,$http,url,sellers,$window,order,$location) {
    var authorization = $window.localStorage['Authorization'];

    $scope.view_single_product = function(id){
      $location.path('/view_single_product/'+id);
    }
    if(!authorization){
        $location.path('signin');
    }
      // new order({status:"Shipped"}).$get(function(data){
      //     console.log(data);
      //   //  $scope.orders =data.data.Resource;
      //   if(data["status"]=="success"){
      //     $scope.orders = data["response"]["orders"];
      //
      //   }
      // },function(data){
      //
      // });
      var main_url = url+sellers+"tracking/getStatus?status=Shipped";
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
  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:OutOfStockProductsCtrl
 * @description
 * # OutOfStockProductsCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('OutOfStockProductsCtrl', ['$scope','$http','url','sellers','$window','$location','user_url', function($scope,$http,url,sellers,$window,$location,user_url) {
    //{{url}}/api/v1/products/get-non-approved-products
    var authorization = $window.localStorage['Authorization'];

    if(!authorization){
        $location.path('signin');
    }
    var inactive_product = url+sellers+"products/out-of-stock";
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
       $scope.out_of_stock_product=data.data.response.products;
       $scope.user_url=user_url;

      //  }

     });
  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('SidebarCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });


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

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:TrackOrderCtrl
 * @description
 * # TrackOrderCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('TrackOrderCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:UpdateSellersCtrl
 * @description
 * # UpdateSellersCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('UpdateSellersCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name ecommercesellerApp.controller:ViewSingleProductCtrl
 * @description
 * # ViewSingleProductCtrl
 * Controller of the ecommercesellerApp
 */
angular.module('ecommercesellerApp')
  .controller('ViewSingleProductCtrl', ['$scope','$http','url','sellers','$window','$routeParams', function($scope,$http,url,sellers,$window,$routeParams) {
    var new_url  = url+'api/v1/sellers/orders/'+$routeParams.id;
    var authorization = $window.localStorage['Authorization'];
    var req = {
       method: 'Get',
       url: new_url,
       headers: {
           'Authorization': authorization
       }
     }
     $http(req).then(function(data){
       if(data.data.status =="success"){
         $scope.order =data.data.response.orders;
         console.log(data.data.response.orders);
       }
        // $scope.order = data.data.response.order;
        // console.log($scope.order);
     });
 }]);

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

'use strict';

/**
 * @ngdoc directive
 * @name ecommercesellerApp.directive:albums
 * @description
 * # albums
 */
angular.module('ecommercesellerApp')
  .directive('albums', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the albums directive');
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name ecommercesellerApp.directive:order
 * @description
 * # order
 */
angular.module('ecommercesellerApp')
  .directive('order', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the order directive');
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name ecommercesellerApp.directive:albums
 * @description
 * # albums
 */
angular.module('ecommercesellerApp')
  .directive('deactiveLink', function () {
    return {
      template: '<button class="btn  btn-primary" ng-click="deactivate_product()">Deactivate ss[{{id}}]</button>',
      restrict: 'E',
      transclue: true,
      replace: true,
      scope: {
        id: "="
      }
      controller: "ProductCtrl"
    };
  });

;!function(e,i,t,n){var a=function(i,t){this.$element=i,this.defaults={width:"200px",height:"200px",backgroundSize:"cover",fontSize:"16px",borderRadius:"5px",border:"0",lang:"zh-cn"},this.options=e.extend({},this.defaults,t)};a.prototype={preview:function(){return o({$element:this.$element,width:this.options.width,height:this.options.height,backgroundSize:this.options.backgroundSize,fontSize:this.options.fontSize,borderRadius:this.options.borderRadius,border:this.options.border,lang:this.options.lang}),r(this.$element,this.$element.children("input")),this.$element}};var o=function(i){switch(i.lang){case"zh-cn":i.$element.append('<span>点击选择图片</span><div class="up_again">点击重新<br>选择图片</div>');break;case"en":i.$element.append('<span>click to choose a pic</span><div class="up_again">click again<br>to choose another</div>');break;default:i.$element.append('<span>click here to choose pic</span><div class="up_again">click again<br>choose pic</div>')}var t=i.$element.attr("class").trim(),n=t.indexOf(" ");-1!==n&&(t=t.substr(0,n)),e("head").append("<style>."+t+" { font-size: "+i.fontSize+"; width: "+i.width+"; height: "+i.height+"; border-radius: "+i.borderRadius+";border: "+i.border+"; position: relative; overflow: hidden; background-color: #eee; background-size: "+i.backgroundSize+"; background-repeat: no-repeat; background-position: center; -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);}."+t+" span { display: block; padding: 0; line-height: "+i.height+"; text-align: center; }."+t+' input { position: absolute; font-size: 2000px; z-index: 200; top: 0; right: 0; opacity: 0; -ms-filter: "alpha(opacity=0)"; cursor: pointer; }.'+t+" .up_again { display: table-cell; vertical-align: middle; text-align: center; width: "+i.width+"; height: "+i.height+"; opacity: 0; color: #fff; transition: 0.3s ease-in-out; -moz-transition: 0.3s ease-in-out; -webkit-transition: 0.3s ease-in-out; -o-transition: 0.3s ease-in-out; line-height: 1.6; }."+t+":hover .up_again { opacity: 1; background: rgba(0, 0, 0, 0.5); }</style>")},s=function(i,t){if(t.files&&t.files[0]){var n=new FileReader;n.onload=function(e){i.css("background-image","url("+e.target.result+")")},n.readAsDataURL(t.files[0]),e(t).next("span").hide()}},r=function(e,i){i.change(function(){s(e,this)})};e.fn.uploadPreview=function(e){var i=new a(this,e);return i.preview()}}(jQuery,window,document);

'use strict';

/**
 * @ngdoc service
 * @name ecommercesellerApp.auth
 * @description
 * # auth
 * Service in the ecommercesellerApp.
 */
angular.module('ecommercesellerApp')
  .service('auth', (['$resource','$window', function($resource,$window) {
    this.unauth = function () {
        alert("You have been Login By Other Account.");
    };
}]));

'use strict';

/**
 * @ngdoc service
 * @name ecommercesellerApp.order
 * @description
 * # order
 * Service in the ecommercesellerApp.
 */
angular.module('ecommercesellerApp')
  .service('order', (['$resource','url','sellers','$window', function($resource,url,sellers,$window) {
  
    var main_url = url+sellers+"tracking/getStatus?status=:status";
    var authorization = $window.localStorage['Authorization'];
    return $resource(main_url,{status:'@status'},{
    get: {
      method: 'GET',
      headers:{Authorization:authorization},
    }
  });
}]));
