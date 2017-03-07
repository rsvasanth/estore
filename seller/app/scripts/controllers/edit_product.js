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
