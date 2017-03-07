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
