  'use strict';

  /**
   * @ngdoc function
   * @name eCommerceAdminApp.controller:ProductEditCtrl
   * @description
   * # ProductEditCtrl
   * Controller of the eCommerceAdminApp
   */
  angular.module('eCommerceAdminApp')
    .controller('ProductEditCtrl', [
      'Product',
      'Category',
      "$scope",
      "$location",
      "$routeParams",
      "sessionService",
      function(Product, Category, $scope, $location, $routeParams, sessionService) {
        var _this = this;
        _this.title = "Edit Product";
        _this.product = {};
        var getSingleProduct = Product.getSingleProduct;
        var getCategories = Category.getApprovedCategories;
        var uP = Product.updateProduct;


        _this.addVariants = function () {
          _this.product.variants.push({name:"", quantity: ""});
        }
        _this.removeVariants = function ($index) {
          _this.product.variants.splice($index, 1);
        }
        _this.categoryChanged = function() {
          var subCategories = new getCategories({
            id: _this.product.category
          });
          subCategories.$get(function(data) {
            _this.subcategories = data.response.categories[0].children;
          });
        }
        _this.saveProduct = function() {
          event.preventDefault();

          var product = angular.copy(_this.product);
          var images = product.images;
          delete product.created_at;
          delete product.updated_at;
          delete product.categories;
          delete product.pricing.service_tax;
          delete product.pricing.after_discount;
          delete product.pricing.price;
          delete product.shipping_details;
          delete product.images;
          delete product.pricing;

          product.service_tax = _this.product.pricing.service_tax;
          product.price = _this.product.pricing.original;
          product.commission = _this.product.pricing.commission;
          product.selling_price = _this.product.pricing.after_discount;
          product.shipping_fee = _this.product.shipping_details.shipping_fee;
          product.ship_duration = _this.product.shipping_details.ship_duration;

          product.images = [];
          images.forEach(function(item) {
            product.images.push(item._id);
          })
          var updateProduct = new uP(product);
          updateProduct.$update({id: product._id}, function(data) {
            var response = data.response;
            if (data.status == "success") {
              _this.notify = {
                message: data.statusMessage,
                status: data.status,
                type: "success"
              }
            } else {
              _this.notify = {
                message: data.statusMessage,
                status: data.status,
                type: "danger"
              }
            }
          });
        }
        _this.init = function() {
          var gAP = new getSingleProduct({
            id: $routeParams.id
          });
          gAP
            .$get(function(data) {
                var response = data.response;
                if (data.status == "success") {
                  _this.product = response.product;
                  _this.product_old = angular.copy(_this.product);
                  _this.product.selected_categories = [];
                  _this.product.categories.forEach(function(item) {
                    _this.product.selected_categories.push(item._id);
                  });
                  var getC = new getCategories();
                  getC.$get(
                    function(data) {
                      var response = data.response;
                      if (data.status == "success") {
                        _this.categories = response.categories;
                        _this.categories.forEach(function(item) {
                          if (_this.product.selected_categories.indexOf(item._id) !== -1) {
                            _this.product.category = item._id;
                            var subCategories = new getCategories({
                              id: _this.product.category
                            });
                            subCategories.$get(function(data) {
                              _this.subcategories = data.response.categories[0].children;
                              _this.subcategories.forEach(function(item) {
                                if (_this.product.selected_categories.indexOf(item._id) !== -1) {
                                  _this.product.subcategory = item._id;
                                }
                              });
                            });
                          }
                        })
                      } else {
                        _this.notify = {
                          message: data.statusMessage,
                          status: data.status,
                          type: "danger"
                        }
                      }
                    },
                    function(data) {
                      var response = data.response;
                      _this.notify = {
                        message: data.statusMessage,
                        status: data.status,
                        type: "danger"
                      }
                    });
                } else {
                  _this.notify = {
                    message: data.statusMessage,
                    status: data.status,
                    type: "danger"
                  }
                }
              },
              function(data) {
                var response = data.response;
                if (data.status == "401") {
                  sessionService.destroy('token');
                  $location.path("/login");
                }
                _this.notify = {
                  message: response.statusMessage,
                  status: response.status,
                  type: "danger"
                }
              });
        }
        _this.init();

      }
    ]);
