'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('AccountCtrl', ['$routeParams', 'Main', 'Account', 'Order', "$location", "sessionService", 'endpoint', "$scope", "fileUpload","$http", function($routeParams, Main,  Account, Order, $location, sessionService, endpoint, $scope, fileUpload,$http) {
        var _this = this;
    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

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
      _this.crop = function() {
                console.log(_this.ud);
               urltoFile($scope.myCroppedImage, 'a.png', 'image/png')
                 .then(function(file) {
                   var fd = new FormData();
                   fd.append('image', file);
                   var uploadUrl = endpoint+"/images/upload-single-image";
                   $http.post(uploadUrl, fd, {
                       transformRequest: angular.identity,
                       headers: {
                         'Content-Type': undefined
                       }
                     })
                     .success(function(data) {
                        console.log("ff");
                        if(data.status == "success"){
                          _this.dataLoading = false;
                 			   user.logo=data.response._id;
                 			    var saveDetails = Account.saveDetails;
                             var save = new saveDetails(user);
                             save.$get().then(function(data) {
                                 if (data.status == "success") {
                                     _this.success = data;
                                 } else {
                                     _this.dataLoading = false;
                                     _this.error = data;
                                 }
                             });

                        }

                     })
                     .error(function(data, status) {
                       console.log(data);
                     });
                 })
             }

        this.close = function() {
            _this.error = '';
            _this.success = '';
        }

		var getCountry = Main.getCountry;
        var gC = new getCountry();
        gC.$get(function(data) {
			_this.country=data.response;
		});


        var getDetails = Account.getDetails;
        var gD = new getDetails();
        gD
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
				if(data.status=='fail')
					$location.path("/login");
                if (data.status == "success") {
                    _this.ud = data.response;
					if(data.response.billing!=undefined){
						_this.billing = data.response.billing;
						_this.shipping = data.response.shipping;
					}
					else{
						_this.billing = data.response.address[0];
						_this.shipping = data.response.address[0];
					}
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
        var getOrder = Order.getOrder;
        var sO = new getOrder();
        sO
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.orders = data.response;

                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
        this.updateUser = function(pid) {

            _this.dataLoading = true;
			var file = $scope.myFile;
      urltoFile($scope.myCroppedImage, 'a.png', 'image/png')
        .then(function(file) {
          var uploadUrl = endpoint+"/images/upload-single-image";
           fileUpload.uploadFileToUrl(file, uploadUrl,_this.ud,_this);
        })

        }
        this.changePassword = function(pid) {
            _this.dataLoading = true;
            var updatePassword = Account.updatePassword;
            var cP = new updatePassword(_this.change);
            cP.$get().then(function(data) {
                if (data.status == "success") {
                    _this.dataLoading = false;
                    _this.success = data;
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
        }
    }])
	.directive('fileModel', ['$parse', function ($parse) {
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
	 }])

	.service('fileUpload', ['$http', 'Account', function ($http, Account) {
		this.uploadFileToUrl = function(file, uploadUrl,user,_this){
		   var fd = new FormData();
		   fd.append('image', file);
		   $http.post(uploadUrl, fd, {
			  transformRequest: angular.identity,
			  headers: {'Content-Type': undefined}
		   })
		   .success(function(data){
			   _this.dataLoading = false;
			   user.logo=data.response._id;

      $("#image_id").attr("src",data.response.cdn.secure_url);
    
			    var saveDetails = Account.saveDetails;
            var save = new saveDetails(user);
            save.$get().then(function(data) {
                if (data.status == "success") {
                    _this.success = data;
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
		   })

		   .error(function(){
		   });
		}
	 }])
