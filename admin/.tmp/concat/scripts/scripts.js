'use strict';

/**
 * @ngdoc overview
 * @name eCommerceAdminApp
 * @description
 * # eCommerceAdminApp
 *
 * Main module of the application.
 */
angular
  .module('eCommerceAdminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'angular.filter'
  ])
  .constant({
    'endpoint': "http://45.55.165.182:3000/api/v1"//'http://45.55.165.182:3000/api/v1'//'http://ecommerce.provenlogic.xyz/api/v1'//"http://localhost:3000/api/v1"//'http://ecommerce.provenlogic.xyz/api/v1'
  })
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        requireAuth: true
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        requireAuth: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LC'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC',
        requireAuth: true
      })
      .when('/product/:id', {
        templateUrl: 'views/product-edit.html',
        controller: 'ProductEditCtrl',
        controllerAs: 'ProdEdit',
        requireAuth: true
      })
      .when('/product/view/:id', {
        templateUrl: 'views/product-view.html',
        controller: 'ProductViewCtrl',
        controllerAs: 'ProdView',
        requireAuth: true
      })
      .when('/pages', {
        templateUrl: 'views/pages.html',
        controller: 'PagesCtrl',
        controllerAs: 'PagesCtrl',
        requireAuth: true
      })
      .when('/pages/:id', {
        templateUrl: 'views/pages-edit.html',
        controller: 'PagesEditCtrl',
        controllerAs: 'PagesEdit',
        requireAuth: true
      })
      .when('/add-pages', {
        templateUrl: 'views/pages-edit.html',
        controller: 'PagesAddCtrl',
        controllerAs: 'PagesEdit',
        requireAuth: true
      })
      .when('/emailtemplates', {
        templateUrl: 'views/emailtemplates.html',
        controller: 'EmailtemplatesCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/emailtemplates/:id', {
        templateUrl: 'views/emailtemplates-edit.html',
        controller: 'EmailtemplatesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-emailtemplates', {
        templateUrl: 'views/emailtemplates-edit.html',
        controller: 'EmailtemplatesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/categories/:id', {
        templateUrl: 'views/categories-edit.html',
        controller: 'CategoriesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/edit-sub-categories/:id', {
        templateUrl: 'views/sub-categories-edit.html',
        controller: 'CategoriesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-categories', {
        templateUrl: 'views/categories-edit.html',
        controller: 'CategoriesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-sub-categories', {
        templateUrl: 'views/sub-categories-edit.html',
        controller: 'CategoriesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-users', {
        templateUrl: 'views/users-edit.html',
        controller: 'UsersAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/users/:id', {
        templateUrl: 'views/users-edit.html',
        controller: 'UsersEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/profile/:id', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/change-password', {
        templateUrl: 'views/change-password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/configuration', {
        templateUrl: 'views/site-configuration.html',
        controller: 'SiteConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/main-banner', {
        templateUrl: 'views/main-banner.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/sub-banner', {
        templateUrl: 'views/sub-banner.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/home-page-images', {
        templateUrl: 'views/home-page-images.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/finance', {
        templateUrl: 'views/finance.html',
        controller: 'FinanceCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/finance/:id', {
        templateUrl: 'views/finance-single.html',
        controller: 'FinanceSingleCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .otherwise({
        redirectTo: '/login'
      });

  }])
  .run(['$rootScope', '$location', 'sessionService', function($rootScope, $location, sessionService) {
    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
      if (newUrl.requireAuth && !sessionService.get('token')) {
        event.preventDefault();
        $location.path('/login');
      }
      if(newUrl.controller == "LoginCtrl" && sessionService.get('token')) {
        event.preventDefault();
        $location.path('/');
      }
    });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('MainCtrl', ['sessionService', function (sessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc directive
 * @name eCommerceAdminApp.directive:partials
 * @description
 * # partials
 */
angular.module('eCommerceAdminApp')
  .directive('headerBar', function() {
    return {
      templateUrl: 'partials/headerbar.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('sideBar', function() {
    return {
      templateUrl: 'partials/sidebar.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('footerBar', function() {
    return {
      templateUrl: 'partials/footer.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('logOutButton', function() {
    var html = '<div class="pull-right">' +
      '<a href="javascript:void(0)" ng-click="LC.logout()" class="btn btn-default btn-flat">Sign out</a>' +
      '</div>';
    return {
      template: html,
      restrict: 'E',
      controller: 'LoginCtrl',
      controllerAs: 'LC',
    };
  })

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('LoginCtrl', ['AdminAuth', 'sessionService', '$location', function (AdminAuth, sessionService, $location) {
    var _this = this;
    this.loginAsAdmin = function () {
      var Admin = new AdminAuth(_this.login);
      Admin.$login().then(function(data) {
        if(data.status == "success") {
          sessionService.set('token', data.response.token);
          sessionService.set('user', JSON.stringify(data.response));
          $location.path("/");
        }
        else {
          _this.error = data.statusMessage;
        }
      });
    }
    this.logout = function () {
      sessionService.destroy('token');
      $location.path("/login");
    }
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Admin
 * @description
 * # Admin
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('AdminAuth', ['$resource', 'endpoint', function($resource, endpoint) {
    return $resource(endpoint+'/admin/auth', null,
    {
        'login': { method:'POST' }
    });
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Auth
 * @description
 * # Auth
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('sessionService', ['$cookieStore', function($cookieStore) {
    return {
      set: function(key, value) {
        return $cookieStore.put(key, value);
      },
      get: function(key) {
        return $cookieStore.get(key);
      },
      destroy: function(key) {
        return $cookieStore.remove(key);
      }
    };
  }])

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Category
 * @description
 * # Category
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('Category', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + '/categories', {}, {
      getAllCategories: {
        url: endpoint +  "/categories/get-categories",
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      getApprovedCategories: {
        url: endpoint +  "/categories/get-approved-categories",
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      getNonApprovedCategories: {
        url: endpoint +  "/categories/get-non-approved-categories",
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      updateCategoryStatus: {
        url: endpoint +  "/categories/update-category-status/:id",
        method: 'POST',
        headers: {"Authorization": sessionService.get("token")}
      },
      updateCategory: {
        url: endpoint +  "/categories/update-category/:id",
        method: 'PUT',
        headers: {"Authorization": sessionService.get("token")}
      },
      getSingleCategory: {
        url: endpoint +  "/categories/get-single-category/:id",
        params: {id: "@id"},
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      deleteSingle: {
        url: endpoint +  "/categories/:id",
        method: 'DELETE',
        headers: {"Authorization": sessionService.get("token")}
      },
      addSingle: {
        method: 'POST',
        headers: {"Authorization": sessionService.get("token")}
      }
    });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('ProductCtrl', ['Product', "$scope", "$location", "sessionService", function(Product, $scope, $location, sessionService) {
    var _this = this;
    Product.getAllProducts({}, {}, function(data) {
      var response = data.response;
      if (data.status == "success") {
        _this.product_list = response.products;
      }
    }, function(data) {
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
    _this.updateStatus = function(id, status, index) {
      Product.updateProductStatus({
        id: id,
        status: status
      }, {}, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: "Updated Succesfully",
            status: data.status,
            type: "success"
          }
          _this.product_list[index].status = status;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      })
    }
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
      });
    });
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Product
 * @description
 * # Product
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('Product', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {

    return $resource(endpoint + '/products', null, {
       getAllProducts: {
         url: endpoint + '/products/get-products',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       },
       getApprovedProducts: {
         url: endpoint + '/products/get-approved-products',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       },
       getNonApprovedProducts: {
         url: endpoint + '/products/get-non-approved-products',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       },
       updateProductStatus: {
         url: endpoint + '/products/update-product-status/:id/:status',
         method: 'PUT',
         headers: {"Authorization": sessionService.get("token")}
       },
       updateProduct: {
         url: endpoint + '/products/update-product/:id',
         method: 'PUT',
         headers: {"Authorization": sessionService.get("token")}
       },
       getSingleProduct: {
         url: endpoint + '/products/get-single-product/:id',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       }
     });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CommonCtrl', ["sessionService", function (sessionService) {
    var admin = JSON.parse(sessionService.get("user"));
    this.name = admin.name;
    this._id = admin._id;
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name eCommerceAdminApp.directive:common_directive
 * @description
 * # common_directive
 */
angular.module('eCommerceAdminApp')
  .directive('userName', function() {
    return {
      templateUrl: 'partials/headerbar.html',
      restrict: 'E',
      controller: "CommonCtrl",
      controllerAs: 'CC'
    };
  })
  .directive('notificationBar', ["$timeout", function($timeout) {
    var template = "<div class='alert alert-{{alertData.type}}'" +
      "ng-show='alertData.message'" +
      "role='alert' data-notification='{{alertData.status}}'>" +
      "{{alertData.message}}" +
      "</div>";
    return {
      restrict: 'E',
      template: template,
      scope: {
        alertData: "="
      },
      replace: true,
      link: function(scope, element, attrs) {
        scope.$watch("alertData", function(nValue) {
          if(nValue && nValue.message != "") {
            $timeout(function() {
              scope.alertData = {};
            }, 2000);
          }
        });
      }
    };
  }])
  .directive('onFinishRender', ["$timeout", function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function() {
            scope.$emit(attr.onFinishRender);
          });
        }
      }
    }
  }])
  .directive('editButton', ["$timeout", function($timeout) {
    var template = "<a href='{{href}}' title='{{title}}'><i class='fa fa-edit'></i></a>";
    return {
      restrict: 'E',
      template: template,
      scope: {
        href: "@",
        title: "@",
      },
      replace: true
    };
  }])
  .directive('deleteButton', ["$timeout", function($timeout) {
    var template = "<a href='javascript:void(0)' title='{{title}}'><i class='fa fa-trash'></i></a>";
    return {
      restrict: 'E',
      template: template,
      scope: {
        href: "@",
        title: "@",
      },
      replace: true
    };
  }])
  .directive('viewButton', ["$timeout", function($timeout) {
    var template = "<a href='{{href}}' title='{{title}}'><i class='fa fa-eye'></i></a>";
    return {
      restrict: 'E',
      template: template,
      scope: {
        href: "@",
        title: "@",
      },
      replace: true
    };
  }])
  .directive('statusButton', ["$timeout", function($timeout) {
    var template = "<a href='{{href}}' title='{{title}}'><i class='fa fa-toggle-off'></i></a>";
    return {
      restrict: 'E',
      template: template,
      scope: {
        href: "@",
        title: "@",
      },
      replace: true
    };
  }])
  .directive('formInput', ["$timeout", function($timeout) {
    var template = '<div class="form-group">' +
      '<label for="{{id}}">{{label}}</label>' +
      '<input type="text" required name="{{name}}" class="form-control" ng-model="model" id="{{id}}" placeholder="Enter {{label}}">' +
      '<div ng-messages="myForm.name.$error" ng-message-include="../template/error.tpl.html" class="text-danger"></div>' +
      '</div>';
    return {
      restrict: 'E',
      require: "^ngMessages",
      template: template,
      scope: {
        label: "@",
        model: "=",
        name: "@",
        id: "@",
        required: "&"
      },
      replace: true
    };
  }])
  .directive('textArea', ["$timeout", function($timeout) {
    var template = '<div class="form-group">' +
      '<label for="{{id}}">{{label}}</label>' +
      '<textarea ng-model="model" class="form-control" id="{{id}}" placeholder="Enter {{label}}"></textarea>' +
      '</div>';
    return {
      restrict: 'E',
      template: template,
      scope: {
        label: "@",
        id: "@",
        model: "="
      },
      replace: true
    };
  }])
  .directive('categorySelect', function() {
    var template = '<div class="form-group">' +
      '<label>{{label}}</label>' +
      '<select class="form-control" ng-change="{{selectChange}}" ng-model="model">' +
      '<option value="{{option._id}}" ng-repeat="option in options">' +
      '{{option.name}}</option>' +
      '</select>' +
      '</div>';
    return {
      restrict: 'E',
      require: "?ngModel",
      template: template,
      scope: {
        label: "@",
        id: "@",
        model: "=",
        options: "=",
        selected: "=",
        selectChange: "@"
      },
      replace: true
    };
  })
  .directive('dataTable', ["$timeout", function($timeout) {
    return {
      restrict: "A",
      link: function(scope, elem, attr) {
        elem.bind("onFinishRender", function() {
          $(elem).DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": false
          });
        });
      }
    };
  }])
  .directive('ckEditor', function() {
    return {
      require: '?ngModel',
      link: function(scope, elm, attr, ngModel) {
        var ck = CKEDITOR.replace(elm[0]);
        if (!ngModel) return;
        ck.on('instanceReady', function() {
          ck.setData(ngModel.$viewValue);
        });

        function updateModel() {
          scope.$apply(function() {
            ngModel.$setViewValue(ck.getData());
          });
        }
        ck.on('change', updateModel);
        ck.on('key', updateModel);
        ck.on('dataReady', updateModel);

        return ngModel.$render = function(value) {
          ck.setData(ngModel.$viewValue);
        };
      }
    };
  });

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

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:ProductViewCtrl
 * @description
 * # ProductViewCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('ProductViewCtrl', [
    'Product',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(Product, $scope, $location, $routeParams,sessionService) {
      var _this = this;
      _this.title = "View Product";
      var getSingleProduct = Product.getSingleProduct;
      var gAP = new getSingleProduct({id: $routeParams.id});
      gAP
        .$get(function(data) {
          var response = data.response;
          if (data.status == "success") {
            _this.product_details = response.product;
          }
          else {
            _this.notify = {
              message: response.statusMessage,
              status: response.status,
              type: "danger"
            }
          }
        }, function(data) {
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
  ]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PagesCtrl
 * @description
 * # PagesCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PagesCtrl', ["pages", function (pages) {
    var _this = this;
    _this.title = "View Pages";
    pages.query(function(data) {
      if(data.status == "success") {
        _this.pages = data.response.pages;
      }
      else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function (data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.remove = function (id, index) {
      pages.remove({id:id}, {}, function(data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.pages.splice(index, 1);
        }
        else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function (data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.pages
 * @description
 * # pages
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('pages', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/pages", {}, {
      query: {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      create: {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      },
      get: {
        method: "GET",
        url: endpoint + "/pages/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/pages/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      update: {
        method: "PUT",
        url: endpoint + "/pages/:id",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PagesEditCtrl
 * @description
 * # PagesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PagesEditCtrl', [
    'pages',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(pages, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Edit Pages";
      pages.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.page = data.response.page;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      _this.savePage = function() {
        pages.update({
          id: $routeParams.id
        }, _this.page, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
    }
  ]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PagesEditCtrl
 * @description
 * # PagesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PagesAddCtrl', [
    'pages',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(pages, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Add Pages";
      _this.savePage = function() {
        pages.create({}, _this.page, function(data) {
          if (data.status == "success") {
            _this.page = "";
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
    }
  ]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.emailtemplates
 * @description
 * # emailtemplates
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('emailtemplates', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/emailtemplates", {}, {
      query: {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      create: {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      },
      get: {
        method: "GET",
        url: endpoint + "/emailtemplates/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/emailtemplates/:id",
        headers: {"Authorization": sessionService.get("token")}
      },
      update: {
        method: "PUT",
        url: endpoint + "/emailtemplates/:id",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EmailtemplatesCtrl
 * @description
 * # EmailtemplatesCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EmailtemplatesCtrl', ["emailtemplates", function(emailtemplates) {
    var _this = this;
    _this.title = "View Email Templates";
    emailtemplates.query(function(data) {
      if (data.status == "success") {
        _this.emailtemplates = data.response.email_templates;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });

    _this.remove = function (id, index) {
      emailtemplates.remove({id:id}, {}, function(data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.emailtemplates.splice(index, 1);
        }
        else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function (data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EmailtemplatesEditCtrl
 * @description
 * # EmailtemplatesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EmailtemplatesEditCtrl', [
    'emailtemplates',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(emailtemplates, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Edit Email Templates";
      emailtemplates.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.emailtemplate = data.response.email_template;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      _this.saveEmailTemplates = function() {
        emailtemplates.update({
          id: $routeParams.id
        }, _this.emailtemplate, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
    }
  ]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EmailtemplatesAddCtrl
 * @description
 * # EmailtemplatesAddCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EmailtemplatesAddCtrl', [
    'emailtemplates',
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    function(emailtemplates, Category, $scope, $location, $routeParams, sessionService) {
      var _this = this;
      _this.title = "Add Email Templates";
      _this.saveEmailTemplates = function() {
        emailtemplates.create({}, _this.emailtemplate, function(data) {
          if (data.status == "success") {
            _this.emailtemplate = "";
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
    }
  ]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CategoriesCtrl', ["Category", "$scope", function (Category, $scope) {
    var _this = this;
    _this.title = "View Categories";
    Category.getAllCategories({}, {},function(data) {
      if(data.status == "success") {
        _this.categories = data.response.categories;
      }
      else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function (data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.remove = function (id, index) {
      Category.deleteSingle({id:id}, {}, function(data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.categories.splice(index, 1);
        }
        else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function (data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
      });
    });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CategoriesAddCtrl
 * @description
 * # CategoriesAddCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CategoriesAddCtrl',[
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(Category, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add Categories";
      _this.sub_title = "Add Sub Categories";
      _this.category = {};
      Category.getApprovedCategories({}, {}, function(data) {
        if (data.status == "success") {
          _this.categories = data.response.categories;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });

      _this.saveCategory = function() {
        Category.addSingle({}, _this.category, function(data) {
          if (data.status == "success") {
            _this.category = {};
            _this.notify = {
              message: "Created Successfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        })
      }
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          var data = resp.data;
          if (data.status == "success") {
            _this[name].image = data.response;
          } else {
            _this.notify = {
              message: data.statusMessage,
              status: data.status,
              type: "danger"
            }
          }
        }, function(resp) {
          var data = resp.data;
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      };
    }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CategoriesEditCtrl
 * @description
 * # CategoriesEditCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CategoriesEditCtrl', [
    'Category',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(Category, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Categories";
      _this.sub_title = "Edit Sub Categories";
      var getSingleCategory = Category.getSingleCategory;
      Category.getSingleCategory({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.category = data.response.category;
          _this.category.parent = _this.category.parent_id ? _this.category.parent_id._id: "";
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      Category.getApprovedCategories({}, {}, function(data) {
        if (data.status == "success") {
          _this.categories = data.response.categories;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      _this.saveCategory = function() {
        var category = angular.copy(_this.category);
        category.parent_id = _this.category.parent;
        Category.updateCategory({
          id: $routeParams.id
        }, category, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "updated Successfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        })
      }
    _this.imageUpload = function(file, name) {
      Upload.upload({
        url: endpoint + '/images/upload-single-image',
        data: {
          image: file
        }
      }).then(function(resp) {
        var data = resp.data;
        if (data.status == "success") {
          _this[name].image = data.response;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(resp) {
        var data = resp.data;
        console.log(resp)
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        _this[name + "ProgressPercentage"] = progressPercentage;
      });
    }
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:SiteConfigurationCtrl
 * @description
 * # SiteConfigurationCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('HomePageConfigurationCtrl', ['homePageConfiguration', 'Upload', 'endpoint', function(homePageConfiguration, Upload, endpoint) {
    var _this = this;
    _this.title = "Main Page Configuration";
    _this.configuration = {};
    _this._t_m_banner = {};
    homePageConfiguration.getConfiguration({}, {}, function(data) {
      if (data.status == "success") {
        _this.configuration = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.editBanner = function(index, type) {
      if(type == "main_banner")
        _this._t_m_banner = _this.configuration[type][index];
      else if(type == "sub_banner")
        _this._t_s_banner = _this.configuration[type][index];
      else
          _this.images = _this.configuration[type][index];
          $('html, body').animate({scrollTop: 0},600);
    };
    _this.deleteBanner = function(index, type) {
      _this.configuration[type].splice(index, 1);
    };
    _this.pushTempToSource = function(item, source) {
      if (!_this.configuration[source])
        _this.configuration[source] = [];
      if (_this.configuration[source].indexOf(item) !== -1) {
        if(source == "main_banner")
          _this._t_m_banner = "";
        else if(source == "sub_banner")
          _this._t_s_banner = "";
        else
          _this.images = "";
        return;
      }
      _this.configuration[source].push(item);
    }
    _this.imageUpload = function(file, name) {
      Upload.upload({
        url: endpoint + '/images/upload-single-image',
        data: {
          image: file
        }
      }).then(function(resp) {
        var data = resp.data;
        if (data.status == "success") {
          _this[name].image = data.response;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(resp) {
        var data = resp.data;
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        _this[name + "ProgressPercentage"] = progressPercentage;
      });
    };
    _this.saveConfiguration = function() {
      var configuration = angular.copy(_this.configuration);
      homePageConfiguration.saveConfiguration({}, configuration, function(data) {
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
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }])
  .controller('SiteConfigurationCtrl', ['siteConfiguration', 'Upload', 'endpoint', function(siteConfiguration, Upload, endpoint) {
    var _this = this;
    _this.title = "Admin Configuration";
    siteConfiguration.getConfiguration({}, {}, function(data) {
      if (data.status == "success") {
        _this.configuration = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.removeUnits = function(index) {
      _this.configuration.units.splice(index, 1);
    };
    _this.addUnits = function() {
      if (_this.configuration.units.indexOf(_this.units) === -1)
        _this.configuration.units.push(_this.units);
      _this.units = "";
    };
    _this.imageUpload = function(file, name) {
      Upload.upload({
        url: endpoint + '/images/upload-single-image',
        data: {
          image: file
        }
      }).then(function(resp) {
        var data = resp.data;
        if (data.status == "success") {
          _this.configuration[name] = data.response;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(resp) {
        var data = resp.data;
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        _this[name + "ProgressPercentage"] = progressPercentage;
      });
    };
    _this.removeShipsIn = function(index) {
      _this.configuration.ships_in.splice(index, 1);
    };
    _this.addShipsIn = function() {
      if (_this.configuration.ships_in.indexOf(_this.ships_in) === -1)
        _this.configuration.ships_in.push(_this.ships_in);
      _this.ships_in = "";
    };
    _this.addSocialLinks = function() {
      if (_this.configuration.social_links.indexOf(_this.social_links) === -1)
        _this.configuration.social_links.push(_this.social_links);
      _this.social_links = "";
    };
    _this.removeSocialLinks = function(index) {
      _this.configuration.social_links.splice(index, 1);
    };
    _this.saveConfiguration = function() {
      var configuration = angular.copy(_this.configuration);
      configuration.overall_banner =configuration.overall_banner._id;
      siteConfiguration.saveConfiguration({}, configuration, function(data) {
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
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.siteConfiguration
 * @description
 * # siteConfiguration
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('siteConfiguration', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/admin/settings", {}, {
      "getConfiguration": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "saveConfiguration": {
        method: "PUT",
        headers: {"Authorization": sessionService.get("token")}
      },
      "createConfiguration": {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }])
  .service('homePageConfiguration', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/admin/home-page-settings", {}, {
      "getConfiguration": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "saveConfiguration": {
        method: "PUT",
        headers: {"Authorization": sessionService.get("token")}
      },
      "createConfiguration": {
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('UsersCtrl', ["users", function(users) {
    var _this = this;
    _this.title = "View Users";
    users.query(function(data) {
      if (data.status == "success") {
        _this.users = data.response.users;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.updateStatus = function(id, status, index) {
      users.update({id:id},{status: status}, function (data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Updated Succesfully",
            status: data.status,
            type: "success"
          }
          _this.users[index].status = status;
        }
        else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      })
    }

    _this.remove = function(id, index) {
      users.remove({
        id: id
      }, {}, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.users.splice(index, 1);
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }])
  .controller('UsersEditCtrl', [
    'users',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Users";
      users.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.user = data.response.user;
          _this.user.upload_image = _this.user.image ? _this.user.image._id : "";
          _this.user.upload_banner = _this.user.banner ? _this.user.banner._id : "";
          _this.user.upload_logo = _this.user.logo ? _this.user.logo._id : "";
          _this.user.role = _this.user.roles ? _this.user.roles[0] : "";
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      _this.saveUser = function() {
        var user = angular.copy(_this.user);
        user.image = user.upload_image ? user.upload_image : null;
        user.banner = user.upload_banner ? user.upload_banner : null;
        user.logo = user.upload_logo ? user.upload_logo : null;
        user.roles = user.role ? user.role : null;
        delete user.upload_image;
        delete user.upload_banner;
        delete user.upload_logo;
        delete user.role;
        users.update({
          id: $routeParams.id
        }, user, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          if (resp.data.status == "success") {
            _this.user[name] = resp.data.response;
            _this.user['upload_' + name] = resp.data.response._id;
          } else {
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "danger"
            }
          }
        }, function(resp) {
          _this.notify = {
            message: resp.statusMessage,
            status: resp.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      }
    }
  ])
  .controller('UsersAddCtrl', [
    'users',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add Users";
      _this.saveUser = function() {
        var user = angular.copy(_this.user);
        user.image = user.upload_image ? user.upload_image : null;
        user.banner = user.upload_banner ? user.upload_banner : null;
        user.logo = user.upload_logo ? user.upload_logo : null;
        user.roles = user.role ? user.role : null;
        delete user.upload_image;
        delete user.upload_banner;
        delete user.upload_logo;
        delete user.role;
        users.create({}, user, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          if (resp.data.status == "success") {
            _this.user[name] = resp.data.response;
            _this.user['upload_' + name] = resp.data.response._id;
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "success"
            }
          } else {
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "danger"
            }
          }
        }, function(resp) {
          _this.notify = {
            message: resp.statusMessage,
            status: resp.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      }
    }
  ])
  .controller('ChangePasswordCtrl', [
    "users",
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Change Password";
      _this.saveUser = function() {
        users.changePassword({
          id: $routeParams.id
        }, _this.password, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
    }
  ])
  .controller('ProfileEditCtrl', [
    "users",
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(users, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Profile";
      users.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.user = data.response.user;
          _this.user.upload_image = _this.user.image ? _this.user.image._id : "";
          _this.user.upload_banner = _this.user.banner ? _this.user.banner._id : "";
          _this.user.upload_logo = _this.user.logo ? _this.user.logo._id : "";
          _this.user.role = _this.user.roles ? _this.user.roles[0] : "";
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      _this.saveUser = function() {
        var user = angular.copy(_this.user);
        user.image = user.upload_image ? user.upload_image : null;
        user.banner = user.upload_banner ? user.upload_banner : null;
        user.logo = user.upload_logo ? user.upload_logo : null;
        user.roles = user.role ? user.role : null;
        delete user.upload_image;
        delete user.upload_banner;
        delete user.upload_logo;
        delete user.role;
        users.update({
          id: $routeParams.id
        }, user, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
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
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }
      _this.imageUpload = function(file, name) {
        Upload.upload({
          url: endpoint + '/images/upload-single-image',
          data: {
            image: file
          }
        }).then(function(resp) {
          if (resp.data.status == "success") {
            _this.user[name] = resp.data.response;
            _this.user['upload_' + name] = resp.data.response._id;
          } else {
            _this.notify = {
              message: resp.statusMessage,
              status: resp.status,
              type: "danger"
            }
          }
        }, function(resp) {
          _this.notify = {
            message: resp.statusMessage,
            status: resp.status,
            type: "danger"
          }
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          _this[name + "ProgressPercentage"] = progressPercentage;
        });
      }
    }
  ]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.user
 * @description
 * # user
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('users', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/users", {}, {
      query: {
        method: "GET",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      changePassword: {
        url: endpoint + "/users/change-password",
        method: "PUT",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      create: {
        method: "POST",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      get: {
        method: "GET",
        url: endpoint + "/users/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/users/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      update: {
        method: "PUT",
        url: endpoint + "/users/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      }
    })
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.fileUpload
 * @description
 * # fileUpload
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('fileUpload', ["Upload", "endpoint", function (Upload, endpoint) {
    return function (file) {

    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('OrdersCtrl', ['orders', "$scope", "$location", "sessionService", function(Orders, $scope, $location, sessionService) {
    var _this = this;
    _this.title = "View Orders";
    Orders.getOrders({}, {}, function(data) {
      if (data.status == "success") {
        _this.orders = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.orders
 * @description
 * # orders
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('orders', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/orders", {}, {
      "getOrders": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }])

'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:FinanceCtrl
 * @description
 * # FinanceCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('FinanceCtrl', ['finance', "$scope", "$location", "sessionService", function(Finance, $scope, $location, sessionService) {
    var _this = this;
    _this.title = "View Transactions";
    Finance.getTransaction({}, {}, function(data) {
      if (data.status == "success") {
        _this.transactions = data.response.transactions;
        _this.settings = data.response.settings;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
  }])
  .controller('FinanceSingleCtrl', ['finance', "$scope", "$location", "sessionService", "$routeParams",
  function(Finance, $scope, $location, sessionService, $routeParams) {
    var _this = this;
    _this.title = "View Detail";
    _this.payAmount = function () {
      Finance.payAmount({
        id: $routeParams.id
      }, _this.pay, function(data) {
        if (data.status == "success") {
          _this.payments.push(data.response);
          if(_this.pay.transaction_type == "payout")
            _this.transactions.paid_out_amount += _this.pay.transferred_amount;
          else
            _this.transactions.refund_amount += _this.pay.transferred_amount;
          _this.transactions.payable_amount -= _this.pay.transferred_amount;
          _this.pay = "";
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
    Finance.getTransactionSingle({
      id: $routeParams.id
    }, {}, function(data) {
      if (data.status == "success") {
        _this.transactions = data.response.transactions[0];
        _this.payments = _this.transactions ? _this.transactions.payments : [];
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
  }]);

'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.finance
 * @description
 * # finance
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('finance', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/finance", {}, {
      "getTransaction": {
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "getTransactionSingle": {
        url: endpoint + "/finance/:id",
        method: "GET",
        headers: {"Authorization": sessionService.get("token")}
      },
      "payAmount": {
        url: endpoint + "/finance/pay-amount/:id",
        method: "POST",
        headers: {"Authorization": sessionService.get("token")}
      }
    })
  }])

angular.module('eCommerceAdminApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/categories-edit.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains category content --> <div class=\"content-wrapper\"> <!-- Content Header (Category header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveCategory()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"Category Name\" required name=\"name\" model=\"Ctrl.category.name\"></form-input> <text-area label=\"Category Description\" model=\"Ctrl.category.description\"></text-area> <div class=\"form-group\"> <div class=\"form-group\"> <div class=\"btn btn-primary\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'category')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\">Select Image</div> <img ng-src=\"{{Ctrl.category.image.url}}\" height=\"100\" width=\"100\"> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.categoryProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.categoryProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"\n" +
    "                  Ctrl.category.name =='' ||\n" +
    "                  Ctrl.category.description == '' ||\n" +
    "                  Ctrl.category.image.url == ''\n" +
    "                  \">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"myForm.reset()\">Reset</button> </div> </div></form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/categories.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains categories content --> <div class=\"content-wrapper\"> <!-- Content Header (Category header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} <small>Control panel</small> </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <div class=\"box\"> <div class=\"box-header\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table id=\"example2\" class=\"table table-bordered table-hover\" data-table> <thead> <tr> <th>S.No</th> <th>Category Name</th> <th>Parent Category</th> <th>Description</th> <th>Action</th> </tr> </thead> <tbody> <tr ng-repeat=\"category in Ctrl.categories\" on-finish-render=\"ngRepeatFinished\"> <td>{{$index+1}}</td> <td>{{category.name}}</td> <td>{{category.parent_id.name}}</td> <td>{{category.description}}</td> <td> <edit-button ng-if=\"category.parent_id == null\" href=\"#/categories/{{category._id}}\" title=\"Edit Category\"></edit-button> <edit-button ng-if=\"category.parent_id !==null \" href=\"#/edit-sub-categories/{{category._id}}\" title=\"Edit Category\"></edit-button> <delete-button ng-click=\"Ctrl.remove(category._id, $index)\" title=\"Delete Category\"></delete-button> </td> </tr> </tbody> <tfoot> <tr> <th>S.No</th> <th>Category Name</th> <th>Parent Category</th> <th>Description</th> <th>Action</th> </tr> </tfoot> </table> </div> </div> <!-- /.content --> </div> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> <div class=\"control-sidebar-bg\"></div> </div> <!-- ./wrapper --></div>"
  );


  $templateCache.put('views/change-password.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains user content --> <div class=\"content-wrapper\"> <!-- Content Header (User header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveUser()\" name=\"myForm\"> <div class=\"box-body\"> <div class=\"form-group\"> <label for=\"Password\">Password</label> <input type=\"password\" required name=\"password\" class=\"form-control\" ng-model=\"Ctrl.password.opassword\" placeholder=\"Enter Password\"> </div> <div class=\"form-group\"> <label for=\"Password\">New Password</label> <input type=\"password\" required name=\"npassword\" class=\"form-control\" ng-model=\"Ctrl.password.npassword\" placeholder=\"Enter New Password\"> </div> <div class=\"form-group\"> <label for=\"Password\">Confirm Password</label> <input type=\"password\" required name=\"cpassword\" class=\"form-control\" ng-model=\"Ctrl.password.cpassword\" placeholder=\"Enter Confirm Password\"> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"myForm.reset()\">Reset</button> </div> </div></form> </div> <!-- /.box-body --> <!-- /.content --> </div> </div></section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/emailtemplates-edit.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains emailtemplate content --> <div class=\"content-wrapper\"> <!-- Content Header (Emailtemplate header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveEmailTemplates()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"Email Template Name\" required name=\"name\" model=\"Ctrl.emailtemplate.name\"></form-input> <form-input label=\"Subject\" required name=\"name\" model=\"Ctrl.emailtemplate.subject\"></form-input> <text-area label=\"Email Template Description\" model=\"Ctrl.emailtemplate.description\"></text-area> <div class=\"form-group\"> <teaxtarea class=\"form-control\" ck-editor=\"\" ng-model=\"Ctrl.emailtemplate.content\"> </teaxtarea></div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </div> </div></form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/emailtemplates.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains emailtemplates content --> <div class=\"content-wrapper\"> <!-- Content Header (Email Template header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} <small>Control panel</small> </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <div class=\"box\"> <div class=\"box-header\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table id=\"example2\" class=\"table table-bordered table-hover\"> <thead> <tr> <th>S.No</th> <th>Email Template Name</th> <th>Description</th> <th>Action</th> </tr> </thead> <tbody> <tr ng-repeat=\"emailtemplate in Ctrl.emailtemplates\"> <td>{{$index+1}}</td> <td>{{emailtemplate.name}}</td> <td>{{emailtemplate.description}}</td> <td> <edit-button href=\"#/emailtemplates/{{emailtemplate._id}}\" title=\"Edit Email Template\"></edit-button> <delete-button ng-click=\"Ctrl.remove(emailtemplate._id, $index)\" title=\"Delete Email Template\"></delete-button> </td> </tr> </tbody> <tfoot> <tr> <th>S.No</th> <th>Email Template Name</th> <th>Description</th> <th>Action</th> </tr> </tfoot> </table> </div> </div> <!-- /.content --> </div> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> <div class=\"control-sidebar-bg\"></div> </div> <!-- ./wrapper --></div>"
  );


  $templateCache.put('views/finance-single.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <p>Seller Name : <b>{{Ctrl.transactions.seller_name}}</b></p> <p>Seller Email : <b>{{Ctrl.transactions.seller_email}}</b></p> <p>Seller Phone : <b>{{Ctrl.transactions.seller_phone}}</b></p> <p>Total Amount: <b>{{Ctrl.transactions.price}}</b></p> <p>Commission Percentage: <b>{{Ctrl.transactions.commission_percentage}}</b></p> <p>Commission: <b>{{Ctrl.transactions.commission_amount}}</b></p> <p>Paid Out Amount: <b>{{Ctrl.transactions.paid_out_amount}}</b></p> <p>Refund Amount: <b>{{Ctrl.transactions.refund_amount}}</b></p> <p>Payable Amount: <b>{{Ctrl.transactions.payable_amount}}</b></p> <table class=\"table\"> <thead> <tr> <td> <input type=\"number\" class=\"form-control\" ng-model=\"Ctrl.pay.transferred_amount\" placeholder=\"Enter Amount\"> </td> <td> <select ng-model=\"Ctrl.pay.transaction_type\" class=\"form-control\"> <option value=\"\">Select Type <option value=\"payout\">Pay Out <option value=\"refund\">Refund </option></option></option></select> </td> <td> <input class=\"form-control\" ng-model=\"Ctrl.pay.reason\" placeholder=\"Enter Reason\"> </td> <td> <input class=\"btn btn-primary\" ng-disabled=\"\n" +
    "                        !Ctrl.pay.transferred_amount ||\n" +
    "                        !Ctrl.pay.transaction_type ||\n" +
    "                        !Ctrl.pay.reason\n" +
    "                      \" type=\"button\" ng-click=\"Ctrl.payAmount()\" value=\"PAY\"> </td> </tr> <tr> <td>Transferred Amount</td> <td>Type</td> <td>Reason</td> <td>Date</td> </tr> </thead> <tfoot> <tr> <td>Transferred Amount</td> <td>Type</td> <td>Reason</td> <td>Date</td> </tr> </tfoot> <tbody> <tr ng-repeat=\"payment in Ctrl.payments\"> <td>{{payment.transferred_amount}}</td> <td>{{payment.transaction_type}}</td> <td>{{payment.reason}}</td> <td>{{payment.created_at}}</td> </tr> </tbody> </table> </div> <!-- /.box-body --> </div> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/finance.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <style>.box-body {\n" +
    "        overflow-x: scroll;\n" +
    "      }</style> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> <h5>All your transactions,amount you owe to sellers,their commision will be displayed here.</h5> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table class=\"table\"> <thead> <tr> <td>Seller Name</td> <td>Seller Email</td> <td>Total Orders</td> <td>Price</td> <td>Commission</td> <td>Paid Out</td> <td>Refund Amount</td> <td>Payable</td> </tr> <tr> <td> <input type=\"text\" ng-model=\"Ctrl.search.seller_name\"> </td> <td> <input type=\"text\" ng-model=\"Ctrl.search.seller_email\"> </td> <td> <input type=\"text\" ng-model=\"Ctrl.search.order_count\"> </td> <td> <input type=\"text\" ng-model=\"Ctrl.search.price\"> </td> <td></td> <td></td> <td></td> <td></td> </tr> </thead> <tbody> <tr ng-repeat=\"transaction in Ctrl.transactions | filter:Ctrl.search\"> <td> <a href=\"#/finance/{{transaction._id}}\"> {{transaction.seller_name}} </a> </td> <td>{{transaction.seller_email}}</td> <td>{{transaction.order_count}}</td> <td>{{transaction.price}}</td> <td>{{transaction.commission_amount| number}}</td> <td>{{transaction.paid_out_amount}}</td> <td> <a href=\"#/finance/{{transaction._id}}\"> {{transaction.refund_amount}}&nbsp;/&nbsp; Edit </a> </td> <td>{{transaction.payable_amount| number}}</td> </tr> </tbody> <tfoot> <tr> <td>Seller Name</td> <td>Seller Email</td> <td>Total Orders</td> <td>Price</td> <td>Commission</td> <td>Paid Out</td> <td>Refund Amount</td> <td>Payable</td> </tr> </tfoot> </table> </div> <!-- /.box-body --> </div> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/home-page-configuration.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">Home Page Settings</h3> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" name=\"myForm\"> <div class=\"box-body\"> <h3> Main Banner </h3> <form-input label=\"Title\" required name=\"title\" model=\"Ctrl._t_m_banner.title\"></form-input> <form-input label=\"Text\" required name=\"text\" model=\"Ctrl._t_m_banner.text\"></form-input> <form-input label=\"Url\" required name=\"url\" model=\"Ctrl._t_m_banner.url\"></form-input> <div class=\"form-group\"> <p>{{Ctrl._t_m_banner.image || \"No Image Uploaded\"}}</p> <div class=\"btn btn-default\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, '_t_m_banner')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-resize=\"{width: 1920, height: 800}\">Upload Main Banner</div> </div> <div class=\"form-group\"> <button type=\"button\" ng-disabled=\"\n" +
    "                  !Ctrl._t_m_banner.title ||\n" +
    "                  !Ctrl._t_m_banner.text  ||\n" +
    "                  !Ctrl._t_m_banner.url  ||\n" +
    "                  !Ctrl._t_m_banner.image\n" +
    "                  \" class=\"btn btn-primary\" ng-click=\"Ctrl.pushTempToSource(Ctrl._t_m_banner, 'main_banner')\"> Add Banner </button> </div> <hr> <div class=\"form-group\"> <table class=\"table\"> <thead> <tr> <td>Title</td> <td>Text</td> <td>Url</td> <td>Image</td> <td>Action</td> </tr> </thead> <tbody> <tr ng-repeat=\"m_banner in Ctrl.configuration.main_banner\"> <td>{{m_banner.title}}</td> <td>{{m_banner.text}}</td> <td>{{m_banner.url}}</td> <td><img src=\"{{m_banner.image.url}}\" height=\"100\" width=\"100\"></td> <td> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.editBanner($index, 'main_banner')\"><i class=\"fa fa-pencil\"></i></a> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.deleteBanner($index, 'main_banner')\"><i class=\"fa fa-trash\"></i></a> </td> </tr> </tbody> </table> </div> <hr> <h3> Sub Banner </h3> <form-input label=\"Title\" required name=\"title\" model=\"Ctrl._t_s_banner.title\"></form-input> <form-input label=\"Text\" required name=\"text\" model=\"Ctrl._t_s_banner.text\"></form-input> <form-input label=\"Url\" required name=\"url\" model=\"Ctrl._t_s_banner.url\"></form-input> <div class=\"form-group\"> <p>{{Ctrl._t_s_banner.image || \"No Image Uploaded\"}}</p> <div class=\"btn btn-default\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, '_t_s_banner')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-resize=\"{width: 1920, height: 800}\">Upload Sub Banner</div> </div> <div class=\"form-group\"> <button type=\"button\" ng-disabled=\"\n" +
    "                  !Ctrl._t_s_banner.title ||\n" +
    "                  !Ctrl._t_s_banner.text  ||\n" +
    "                  !Ctrl._t_s_banner.url  ||\n" +
    "                  !Ctrl._t_s_banner.image\n" +
    "                  \" class=\"btn btn-primary\" ng-click=\"Ctrl.pushTempToSource(Ctrl._t_s_banner, 'sub_banner')\"> Add Banner </button> </div> <hr> <div class=\"form-group\"> <table class=\"table\"> <thead> <tr> <td>Title</td> <td>Text</td> <td>Url</td> <td>Image</td> <td>Action</td> </tr> </thead> <tbody> <tr ng-repeat=\"s_banner in Ctrl.configuration.sub_banner\"> <td>{{s_banner.title}}</td> <td>{{s_banner.text}}</td> <td>{{s_banner.url}}</td> <td><img src=\"{{s_banner.image.url}}\" height=\"100\" width=\"100\"></td> <td> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.editBanner($index, 'sub_banner')\"><i class=\"fa fa-pencil\"></i></a> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.deleteBanner($index, 'sub_banner')\"><i class=\"fa fa-trash\"></i></a> </td> </tr> </tbody> </table> </div> <hr> <h3> Images </h3> <form-input label=\"Title\" required name=\"title\" model=\"Ctrl.images.title\"></form-input> <form-input label=\"Text\" required name=\"text\" model=\"Ctrl.images.text\"></form-input> <form-input label=\"Url\" required name=\"url\" model=\"Ctrl.images.url\"></form-input> <div class=\"form-group\"> <p>{{Ctrl.images.image || \"No Image Uploaded\"}}</p> <div class=\"btn btn-default\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'images')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-resize=\"{width: 1920, height: 800}\">Upload Sub Banner</div> </div> <div class=\"form-group\"> <button type=\"button\" ng-disabled=\"\n" +
    "                  !Ctrl.images.title ||\n" +
    "                  !Ctrl.images.text  ||\n" +
    "                  !Ctrl.images.url  ||\n" +
    "                  !Ctrl.images.image\n" +
    "                  \" class=\"btn btn-primary\" ng-click=\"Ctrl.pushTempToSource(Ctrl.images, 'images')\"> Add Banner </button> </div> <hr> <div class=\"form-group\"> <table class=\"table\"> <thead> <tr> <td>Title</td> <td>Text</td> <td>Url</td> <td>Image</td> <td>Action</td> </tr> </thead> <tbody> <tr ng-repeat=\"image in Ctrl.configuration.images\"> <td>{{image.title}}</td> <td>{{image.text}}</td> <td>{{image.url}}</td> <td><img src=\"{{image.image.url}}\" height=\"100\" width=\"100\"></td> <td> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.editBanner($index, 'images')\"><i class=\"fa fa-pencil\"></i></a> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.deleteBanner($index, 'images')\"><i class=\"fa fa-trash\"></i></a> </td> </tr> </tbody> </table> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"button\" ng-click=\"Ctrl.saveConfiguration()\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"Ctrl.init()\">Reset</button> </div> </form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/home-page-images.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <style>.upload_img\n" +
    "\t\t{\n" +
    "\t\t\tmargin-top:10px;\n" +
    "\t\t}</style> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">Home Page Settings</h3> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" name=\"myForm\"> <div class=\"box-body\"> <h3> Images </h3> <form-input label=\"Set a Title for your Images\" required name=\"title\" model=\"Ctrl.images.title\"></form-input> <form-input label=\"Enter the Text which should be displayed over the Images\" required name=\"text\" model=\"Ctrl.images.text\"></form-input> <form-input label=\"Enter the Url which the user should be redirected by clicking on the Images\" required name=\"url\" model=\"Ctrl.images.url\"></form-input> <div class=\"form-group\"> <div class=\"form-group\"> <b>Click on the Select Image to Upload the Image</b> <br> <div class=\"btn btn-primary\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'images')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\">Select Image</div> <img ng-src=\"{{Ctrl.images.image.url}}\" height=\"100\" width=\"100\" class=\"upload_img\"> <p>&nbsp;</p> <div class=\"progress progress-sm active\" ng-if=\"Ctrl.images.image.url !== null\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.imagesProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.imagesProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> </div> <b>Click on Add Images to Confirm And Upload<b> <div class=\"form-group\"> <button type=\"button\" ng-disabled=\"\n" +
    "                  !Ctrl.images.title ||\n" +
    "                  !Ctrl.images.text  ||\n" +
    "                  !Ctrl.images.url  ||\n" +
    "                  !Ctrl.images.image\n" +
    "                  \" class=\"btn btn-primary upload_img\" ng-click=\"Ctrl.pushTempToSource(Ctrl.images, 'images');Ctrl.images={};\"> Add Images </button> </div> <hr> <div class=\"form-group\"> <table class=\"table\"> <thead> <tr> <td>Title</td> <td>Text</td> <td>Url</td> <td>Image</td> <td>Action</td> </tr> </thead> <tbody> <tr ng-repeat=\"image in Ctrl.configuration.images\"> <td>{{image.title}}</td> <td>{{image.text}}</td> <td>{{image.url}}</td> <td><img src=\"{{image.image.url}}\" height=\"100\" width=\"100\"></td> <td> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.editBanner($index, 'images')\"><i class=\"fa fa-pencil\"></i></a> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.deleteBanner($index, 'images')\"><i class=\"fa fa-trash\"></i></a> </td> </tr> </tbody> </table> </div> </b></b></div> <!-- /.box-body --> <div class=\"box-footer\"> Click on Submit To save changes<br> <button type=\"button\" ng-click=\"Ctrl.saveConfiguration()\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"Ctrl.init()\">Reset</button> </div> </form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/login.html',
    "<div class=\"wrapper\" style=\"min-height: 946px\" ng-controller=\"LoginCtrl\"> <section class=\"content\"> <div class=\"col-md-3\"> &nbsp; </div> <div class=\"col-md-6\"> <!-- general form elements --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">Login</h3> </div> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"LC.loginAsAdmin()\"> <p class=\"alert alert-danger\" ng-class=\"{hide: !LC.error}\">{{LC.error}}</p> <div class=\"box-body\"> <div class=\"form-group\"> <label for=\"exampleInputEmail1\">Email address</label> <input type=\"email\" ng-model=\"LC.login.email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Enter email\"> </div> <div class=\"form-group\"> <label for=\"exampleInputPassword1\">Password</label> <input type=\"password\" ng-model=\"LC.login.password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\"> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Login</button> </div> </form> </div> <!-- /.box --> </div> <div class=\"col-md-3\"> &nbsp; </div> </section> </div>"
  );


  $templateCache.put('views/main-banner.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <style>.upload_img\n" +
    "\t\t{\n" +
    "\t\t\tmargin-top:10px;\n" +
    "\t\t}</style> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">Home Page Settings</h3> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" name=\"myForm\"> <div class=\"box-body\"> <h3> Main Banner </h3> <form-input label=\"Set a Title for your Banner\" required name=\"title\" model=\"Ctrl._t_m_banner.title\"></form-input> <form-input label=\"Enter the Text which should be displayed over the Banner\" required name=\"text\" model=\"Ctrl._t_m_banner.text\"></form-input> <form-input label=\"Enter the Url which the user should be redirected by clicking on the Banner\" required name=\"url\" model=\"Ctrl._t_m_banner.url\"></form-input> <div class=\"form-group\"> <div class=\"form-group\"> <b>Click on the Select Image to Upload the Image</b> <br> <div class=\"btn btn-primary\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, '_t_m_banner')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\">Select Image</div> <img ng-src=\"{{Ctrl._t_m_banner.image.url}}\" height=\"100\" width=\"100\" class=\"upload_img\"> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl._t_m_bannerProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl._t_m_bannerProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> </div> Click on Add Banner to Confirm And Upload <div class=\"form-group\"> <button type=\"button\" ng-disabled=\"\n" +
    "                  !Ctrl._t_m_banner.title ||\n" +
    "                  !Ctrl._t_m_banner.text  ||\n" +
    "                  !Ctrl._t_m_banner.url  ||\n" +
    "                  !Ctrl._t_m_banner.image\n" +
    "                  \" class=\"btn btn-primary upload_img\" ng-click=\"Ctrl.pushTempToSource(Ctrl._t_m_banner, 'main_banner'); Ctrl._t_m_banner={};\"> Add Banner </button> </div> <hr> <div class=\"form-group\"> <table class=\"table\"> <thead> <tr> <td>Title</td> <td>Text</td> <td>Url</td> <td>Image</td> <td>Action</td> </tr> </thead> <tbody> <tr ng-repeat=\"m_banner in Ctrl.configuration.main_banner\"> <td>{{m_banner.title}}</td> <td>{{m_banner.text}}</td> <td>{{m_banner.url}}</td> <td><img src=\"{{m_banner.image.url}}\" height=\"100\" width=\"100\"></td> <td> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.editBanner($index, 'main_banner')\"><i class=\"fa fa-pencil\"></i></a> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.deleteBanner($index, 'main_banner')\"><i class=\"fa fa-trash\"></i></a> </td> </tr> </tbody> </table> </div> <hr> </div> <!-- /.box-body --> <div class=\"box-footer\"> Click on Submit To save changes<br> <button type=\"button\" ng-click=\"Ctrl.saveConfiguration()\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"Ctrl.init()\">Reset</button> </div> </form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/main.html',
    "<div class=\"wrapper\" ng-controller=\"MainCtrl as MC\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{MC.current_view}} <small>Control panel</small> </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <!-- Small boxes (Stat box) --> <div class=\"row\"> <div class=\"col-lg-3 col-xs-6\"> <!-- small box --> <div class=\"small-box bg-aqua\"> <div class=\"inner\"> <h3>150</h3> <p>New Orders</p> </div> <div class=\"icon\"> <i class=\"ion ion-bag\"></i> </div> <a href=\"javascript:void(0)\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> </div> </div> <!-- ./col --> <div class=\"col-lg-3 col-xs-6\"> <!-- small box --> <div class=\"small-box bg-green\"> <div class=\"inner\"> <h3>53<sup style=\"font-size: 20px\">%</sup></h3> <p>Bounce Rate</p> </div> <div class=\"icon\"> <i class=\"ion ion-stats-bars\"></i> </div> <a href=\"javascript:void(0)\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> </div> </div> <!-- ./col --> <div class=\"col-lg-3 col-xs-6\"> <!-- small box --> <div class=\"small-box bg-yellow\"> <div class=\"inner\"> <h3>44</h3> <p>User Registrations</p> </div> <div class=\"icon\"> <i class=\"ion ion-person-add\"></i> </div> <a href=\"javascript:void(0)\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> </div> </div> <!-- ./col --> <div class=\"col-lg-3 col-xs-6\"> <!-- small box --> <div class=\"small-box bg-red\"> <div class=\"inner\"> <h3>65</h3> <p>Unique Visitors</p> </div> <div class=\"icon\"> <i class=\"ion ion-pie-graph\"></i> </div> <a href=\"javascript:void(0)\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a> </div> </div> <!-- ./col --> </div> <!-- /.row --> <!-- Main row --> <div class=\"row\"> </div> <!-- /.row (main row) --> </section> <!-- /.content --> </div> <!-- /.content-wrapper --> <footer-bar></footer-bar> <div class=\"control-sidebar-bg\"></div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/orders.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <style>.box-body\n" +
    "    {\n" +
    "      overflow-x:scroll;\n" +
    "    }</style> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> <h5>All your Order Details will be displayed here.</h5> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table class=\"table\"> <thead> <tr> <td>Order ID</td> <td>User Email</td> <td>Payment Date</td> <td>Transaction Id</td> <td>Seller Name</td> <td>Bought Qty</td> <td>Bought Price</td> <td>Payment Type</td> <td>Status</td> </tr> <tr> <td><input type=\"text\" ng-model=\"Ctrl.search._id._id\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.user.email\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.created_at\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.payment.transaction_id\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.seller.name\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.total_qty\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.total_price\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.payment.method\"></td> <td><input type=\"text\" ng-model=\"Ctrl.search.product_status\"></td> </tr> </thead> <tbody> <tr ng-repeat=\"order in Ctrl.orders | filter:Ctrl.search\"> <td>{{order._id._id}}</td> <td>{{order.user.email}}</td> <td><p ng-bind=\"order.created_at | date:'MM/dd/yyyy HH:mm:ss'\"></p></td> <td>{{order.payment.transaction_id}}</td> <td>{{order.seller.name}}</td> <td>{{order.total_qty}}</td> <td>{{order.total_price}}</td> <td>{{order.payment.method}}</td> <td>{{order.product_status}}</td> </tr> </tbody> <tfoot> <tr> <td>Order ID</td> <td>User Email</td> <td>Payment Date</td> <td>Transaction Id</td> <td>Seller Name</td> <td>Bought Qty</td> <td>Bought Price</td> <td>Payment Type</td> <td>Status</td> </tr> </tfoot> </table> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"Ctrl.init()\">Reset</button> </div> </div> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/pages-edit.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{PagesEdit.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{PagesEdit.title}}</h3> </div> <notification-bar alert-data=\"PagesEdit.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"PagesEdit.savePage()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"Page Name\" required name=\"name\" model=\"PagesEdit.page.name\"></form-input> <text-area label=\"Page Description\" model=\"PagesEdit.page.description\"></text-area> <div class=\"form-group\"> <teaxtarea class=\"form-control\" ck-editor=\"\" ng-model=\"PagesEdit.page.content\"> </teaxtarea></div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"myForm.reset()\">Reset</button> </div> </div></form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/pages.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{PagesCtrl.current_view}} <small>Control panel</small> </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <div class=\"box\"> <div class=\"box-header\"> <h3 class=\"box-title\">{{PagesCtrl.current_view}}</h3> </div> <notification-bar alert-data=\"PagesCtrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table data-table id=\"example2\" class=\"table table-bordered table-hover\"> <thead> <tr> <th>S.No</th> <th>Page Name</th> <th>Description</th> <th>Action</th> </tr> </thead> <tbody> <tr ng-repeat=\"page in PagesCtrl.pages\"> <td>{{$index+1}}</td> <td>{{page.name}}</td> <td>{{page.description}}</td> <td> <edit-button href=\"#/pages/{{page._id}}\" title=\"Edit Page\"></edit-button> <delete-button ng-click=\"PagesCtrl.remove(page._id, $index)\" title=\"Delete Page\"></delete-button> </td> </tr> </tbody> <tfoot> <tr> <th>S.No</th> <th>Page Name</th> <th>Description</th> <th>Action</th> </tr> </tfoot> </table> </div> </div> <!-- /.content --> </div> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> <div class=\"control-sidebar-bg\"></div> </div> <!-- ./wrapper --></div>"
  );


  $templateCache.put('views/product-edit.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{ProdEdit.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{ProdEdit.title}}</h3> </div> <notification-bar alert-data=\"ProdEdit.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"ProdEdit.saveProduct()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"Product Name\" required name=\"name\" model=\"ProdEdit.product.title\"></form-input> <form-input label=\"Product SKU\" required name=\"sku\" model=\"ProdEdit.product.sku\"></form-input> <text-area label=\"Product Description\" model=\"ProdEdit.product.description\"></text-area> <div class=\"form-group\"> <label>Category</label> <select class=\"form-control\" ng-change=\"ProdEdit.categoryChanged()\" ng-model=\"ProdEdit.product.category\"> <option value=\"{{option._id}}\" ng-repeat=\"option in ProdEdit.categories\"> {{option.name}}</option> </select> </div> <category-select label=\"Sub Category\" model=\"ProdEdit.product.subcategory\" options=\"ProdEdit.subcategories\"> </category-select> <form-input label=\"Product Quantity\" model=\"ProdEdit.product.quantity\"></form-input> <form-input label=\"Product Price\" model=\"ProdEdit.product.pricing.original\"></form-input> <form-input label=\"Product After Discount\" model=\"ProdEdit.product.pricing.after_discount\"></form-input> <form-input label=\"Product Service Tax\" model=\"ProdEdit.product.pricing.service_tax\"></form-input> <form-input label=\"Product Commission\" model=\"ProdEdit.product.pricing.commission\"></form-input> <h4>Variants <span class=\"pull-right\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ProdEdit.addVariants()\">Add Variants</button> </span></h4> <div class=\"col-md-12\" ng-repeat=\"variant in ProdEdit.product.variants\"> <div class=\"col-md-6\"> <form-input label=\"Product variant Name\" model=\"variant.name\"></form-input> </div> <div class=\"col-md-4\"> <form-input label=\"Product variant Qty\" model=\"variant.quantity\"></form-input> </div> <div class=\"col-md-2\" style=\"padding: 24px\"> <a class=\"btn btn-danger\" href=\"javascript:void(0)\" ng-click=\"ProdEdit.removeVariants($index)\">Remove</a> </div> </div> <h4>Images</h4> <div class=\"col-md-12\"> <div class=\"col-md-6\" ng-repeat=\"image in ProdEdit.product.images\"> <img ng-src=\"{{image.url}}\" height=\"250\" width=\"250\" style=\"padding: 10px\"> </div> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"ProdEdit.init()\">Reset</button> </div> </form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/product-view.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{ProdView.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <div class=\"box\"> <div class=\"box-header\"> <h3 class=\"box-title\">{{ProdView.title}}</h3> </div> <notification-bar alert-data=\"ProdView.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box box-widget\"> <div class=\"box-header with-border\"> <div class=\"user-block\"> <img class=\"img-circle\" src=\"{{image.url}}\" alt=\"Product Image\" ng-repeat=\"image in ProdView.product_details.images\"> <span class=\"username\"><a href=\"javascript:void(0)\">{{ProdView.product_details.title}}</a></span> <span class=\"description\">Created - {{ProdView.product_details.created_at| date:format:fulldate}}</span> <span class=\"description\">Status - {{ProdView.product_details.status ? 'Active' : 'In Active'}}</span> </div> <!-- /.user-block --> <div class=\"box-tools\"> <button type=\"button\" class=\"btn btn-box-tool\" data-toggle=\"tooltip\" title=\"Mark as read\"> <i class=\"fa fa-circle-o\"></i></button> <button type=\"button\" class=\"btn btn-box-tool\" data-widget=\"collapse\"><i class=\"fa fa-minus\"></i> </button> <button type=\"button\" class=\"btn btn-box-tool\" data-widget=\"remove\"><i class=\"fa fa-times\"></i></button> </div> <!-- /.box-tools --> </div> <!-- /.box-header --> <div class=\"box-body\"> <!-- post text --> <table> <tr> <td>Description</td> <td>&nbsp;</td> <td>{{ProdView.product_details.description}}</td> </tr> <tr> <td>Quantity</td> <td>&nbsp;</td> <td>{{ProdView.product_details.quantity}}</td> </tr> <tr> <td>Original Price</td> <td>&nbsp;</td> <td>{{ProdView.product_details.pricing.original}}</td> </tr> <tr> <td>After Discount Price</td> <td>&nbsp;</td> <td>{{ProdView.product_details.pricing.after_discount}}</td> </tr> <tr> <td>Service Tax</td> <td>&nbsp;</td> <td>{{ProdView.product_details.pricing.service_tax}}</td> </tr> <tr> <td>Commission</td> <td>&nbsp;</td> <td>{{ProdView.product_details.pricing.commission}}</td> </tr> </table> <!-- Attachment --> <div class=\"attachment-block clearfix\"> <img class=\"attachment-img\" src=\"{{image.url}}\" alt=\"Product Image\" ng-repeat=\"image in ProdView.product_details.images\"> <div class=\"attachment-pushed\"> <h4 class=\"attachment-heading\">Variants</h4> <div class=\"attachment-text\"> <p ng-repeat=\"variant in ProdView.product_details.variants\">{{variant.name}} : {{variant.quantity}}</p> </div> <!-- /.attachment-text --> </div> <!-- /.attachment-pushed --> </div> <!-- /.attachment-block --> </div> <!-- /.box-body --> </div> </div> <!-- /.content --> </div> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/product.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{ProdC.current_view}} <small>Control panel</small> </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <style>.box-body\n" +
    "      {\n" +
    "        overflow-x:scroll;\n" +
    "      }</style> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <div class=\"box\"> <div class=\"box-header\"> <h3 class=\"box-title\">Product</h3> </div> <notification-bar alert-data=\"ProdC.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table id=\"example2\" class=\"table table-bordered table-hover\"> <thead> <tr> <th>Name</th> <th>Price</th> <th>Added By</th> <th>SKU</th> <th>Remaining</th> <th>Status</th> <th>Created On</th> <th>Action</th> </tr> <!-- <tr>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.title\"></td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.pricing\"></td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.created_by.name\"></td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.sku\"></td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.quantity\"></td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.status\"></td>\n" +
    "                    <td><input type=\"text\" ng-model=\"Ctrl.search.created_at\"></td>\n" +
    "                  </tr> --> </thead> <tbody> <tr ng-repeat=\"product in ProdC.product_list | filter:Ctrl.search\" on-finish-render=\"ngRepeatFinished\"> <td>{{product.title}}</td> <td>Original :{{product.pricing.original}}<br> After Discount:{{product.pricing.after_discount}}<br> Service Tax:{{product.pricing.service_tax}}<br> Commision:{{product.pricing.commission}} </td> <td>{{product.created_by.name}}</td> <td>{{product.sku}}</td> <td>{{product.quantity}}</td> <td>{{product.status == 1 ? \"Active\" : \"Inactive\"}}</td> <td><p ng-bind=\"product.created_at | date:'MM/dd/yyyy HH:mm:ss'\"></p></td> <td> <edit-button href=\"#/product/{{product._id}}\" title=\"Edit Product\"></edit-button> <a href=\"javascript:void(0)\" ng-click=\"ProdC.updateStatus(product._id, !product.status, $index)\" title=\"Update Product Status\"> <i class=\"fa fa-arrow-up\"></i> </a> <view-button href=\"#/product/view/{{product._id}}\" title=\"View Product\"></view-button> </td> </tr> </tbody> <tfoot> <tr> <th>Name</th> <th>Price</th> <th>Added By</th> <th>SKU</th> <th>Remaining</th> <th>Status</th> <th>Created On</th> <th>Action</th> </tr> </tfoot> </table> </div> </div> <!-- /.content --> </div> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> <div class=\"control-sidebar-bg\"></div> </div> <!-- ./wrapper --></div>"
  );


  $templateCache.put('views/profile.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains user content --> <div class=\"content-wrapper\"> <!-- Content Header (User header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveUser()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"User Name\" required name=\"name\" model=\"Ctrl.user.name\"></form-input> <form-input label=\"Email\" required name=\"email\" model=\"Ctrl.user.email\"></form-input> <form-input label=\"Phone\" required name=\"phone\" model=\"Ctrl.user.phone\"></form-input> <div class=\"form-group\"> <lable> User Image </lable> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <div class=\"button btn btn-primary\" ngf-select=\"Ctrl.imageUpload($file, 'image')\">Upload on file select</div> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.imageProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.imageProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> <p>&nbsp;</p> <div class=\"col-md-6\"> <img src=\"{{Ctrl.user.image.url}}\" height=\"100\" width=\"100\"> <input type=\"hidden\" value=\"{{Ctrl.user.logo._id}}\" ng-model=\"Ctrl.user.upload_image\"> </div> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"myForm.reset()\">Reset</button> </div> </div></form> </div> <!-- /.box-body --> <!-- /.content --> </div> </div></section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/site-configuration.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveConfiguration()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"Site Title\" required name=\"title\" model=\"Ctrl.configuration.title\"></form-input> <form-input label=\"Pricing Unit\" required name=\"pricing_unit\" model=\"Ctrl.configuration.pricing_unit\"></form-input> <form-input label=\"Seller Commission\" required name=\"commission\" model=\"Ctrl.configuration.commission\"></form-input> <form-input label=\"Serivice Tax\" required name=\"service_tax\" model=\"Ctrl.configuration.service_tax\"></form-input> <form-input label=\"Email\" required name=\"email\" model=\"Ctrl.configuration.contact.email\"></form-input> <form-input label=\"Phone\" required name=\"phone\" model=\"Ctrl.configuration.contact.phone\"></form-input> <div class=\"form-group\"> <label for=\"address\">Address</label> <textarea class=\"form-control\" placeholder=\"Address\" ng-model=\"Ctrl.configuration.contact.address\"></textarea> </div> <div class=\"form-group\"> <label for=\"ships_in\">Ships In</label> <div class=\"col-md-12\"> <div class=\"col-md-8\"> <input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.ships_in\" placeholder=\"Ships In Days\"> </div> <div class=\"col-md-4\"> <label for=\"ships_in\">&nbsp;</label> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"Ctrl.addShipsIn()\" ng-disabled=\"!Ctrl.ships_in\">+</button> </div> </div> <div class=\"col-md-12 padded\" ng-repeat=\"val in Ctrl.configuration.ships_in | unique\"> <div class=\"col-md-8\"> <input type=\"text\" readonly class=\"form-control\" min=\"1\" ng-model=\"val\"> </div> <div class=\"col-md-4\"> <label for=\"ships_in\">&nbsp;</label> <button type=\"button\" class=\"btn btn-danger\" ng-click=\"Ctrl.removeShipsIn($index)\">X</button> </div> </div> </div> <div class=\"form-group\"> <label for=\"ships_in\">Social Links</label> <!-- <div class=\"col-md-12\">\n" +
    "                    <div class=\"col-md-4\">\n" +
    "                      <input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.social_links.name\" placeholder=\"Name\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-4\">\n" +
    "                      <input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.social_links.url\" placeholder=\"Url\" />\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-4\">\n" +
    "                      <label for=\"ships_in\">&nbsp;</label>\n" +
    "                      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"Ctrl.addSocialLinks()\" ng-disabled=\"!Ctrl.social_links.name || !Ctrl.social_links.url\">+</button>\n" +
    "                    </div>\n" +
    "                  </div> --> <div class=\"col-md-12 padded\" ng-repeat=\"val in Ctrl.configuration.social_links | unique\"> <div class=\"col-md-4\"> <input type=\"text\" class=\"form-control\" ng-model=\"val.name\" placeholder=\"Name\" readonly> </div> <div class=\"col-md-4\"> <input type=\"text\" class=\"form-control\" ng-model=\"val.url\" placeholder=\"Url\"> </div> <div class=\"col-md-4\"> <label for=\"ships_in\">&nbsp;</label> <!-- <button type=\"button\" class=\"btn btn-danger\" ng-click=\"Ctrl.removeSocialLinks($index)\">X</button> --> </div> </div> </div> <div class=\"form-group\"> <label for=\"ships_in\">Payment Gateway</label> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.configuration.payment_gateway[0].name\" placeholder=\"Name\"> </div> <div class=\"col-md-3\"> <input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.configuration.payment_gateway[0].email\" placeholder=\"Email\"> </div> <div class=\"col-md-3\"> <select class=\"form-control\" ng-model=\"Ctrl.configuration.payment_gateway[0].mode\"> <option value=\"sandbox\" selected>Sand Box</option> <option value=\"live\">Live</option> </select> </div> </div> </div> <div class=\"form-group\"> <label for=\"units\">Units</label> <div class=\"col-md-12\"> <div class=\"col-md-8\"> <input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.units\" placeholder=\"Units\"> </div> <div class=\"col-md-4\"> <label for=\"units\">&nbsp;</label> <button type=\"button\" readonly class=\"btn btn-primary\" ng-click=\"Ctrl.addUnits()\" ng-disabled=\"!Ctrl.units\">+</button> </div> </div> <div class=\"col-md-12 padded\" ng-repeat=\"val in Ctrl.configuration.units | unique\"> <div class=\"col-md-8\"> <input type=\"text\" readonly class=\"form-control\" ng-model=\"val\"> </div> <div class=\"col-md-4\"> <label for=\"units\">&nbsp;</label> <button type=\"button\" class=\"btn btn-danger\" ng-click=\"Ctrl.removeUnits($index)\">X</button> </div> </div> </div> <div class=\"form-group\"> <div class=\"btn btn-default\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'fav_icon')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-resize=\"{width: 1920, height: 800}\">Upload Fav Icon</div> <img src=\"{{Ctrl.configuration.fav_icon.url}}\" height=\"100\" width=\"100\"> </div> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.fav_iconProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.fav_iconProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> <div class=\"form-group\"> <div class=\"btn btn-default\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'site_logo')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-resize=\"{width: 1920, height: 800}\">Site Logo</div> <img src=\"{{Ctrl.configuration.site_logo.url}}\" height=\"100\" width=\"100\"> </div> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.site_logoProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.site_logoProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> <div class=\"form-group\"> <div class=\"btn btn-default\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'overall_banner')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\" ngf-max-size=\"20MB\" ngf-resize=\"{width: 1920, height: 800}\">Over All Banner</div> <img src=\"{{Ctrl.configuration.overall_banner.url}}\" height=\"100\" width=\"100\"> </div> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.overall_bannerProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.overall_bannerProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"Ctrl.init()\">Reset</button> </div> </form> </div> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/sub-banner.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <style>.upload_img\n" +
    "\t\t{\n" +
    "\t\t\tmargin-top:10px;\n" +
    "\t\t}</style> <!-- Content Wrapper. Contains page content --> <div class=\"content-wrapper\"> <!-- Content Header (Page header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">Home Page Settings</h3> <div class=\"pull-right box-tools\"> <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" data-widget=\"collapse\" data-toggle=\"tooltip\" title=\"\" style=\"margin-right: 5px\" data-original-title=\"Collapse\"> <i class=\"fa fa-minus\"></i></button> </div> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" name=\"myForm\"> <div class=\"box-body\"> <h3> Sub Banner </h3> <form-input label=\"Set a Title for your Sub Banner\" required name=\"title\" model=\"Ctrl._t_s_banner.title\"></form-input> <form-input label=\"Enter the Text which should be displayed over the Sub Banner\" required name=\"text\" model=\"Ctrl._t_s_banner.text\"></form-input> <form-input label=\"Enter the Url which the user should be redirected by clicking on the Sub Banner\" required name=\"url\" model=\"Ctrl._t_s_banner.url\"></form-input> <div class=\"form-group\"> <div class=\"form-group\"> <b>Click on the Select Image to Upload the Image</b> <br> <div class=\"btn btn-primary\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, '_t_s_banner')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\">Select Image</div> <img ng-src=\"{{Ctrl._t_s_banner.image.url}}\" height=\"100\" width=\"100\" class=\"upload_img\"> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl._t_s_bannerProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl._t_s_bannerProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> </div> <b>Click on Add Sub Banner to Confirm And Upload</b> <div class=\"form-group\"> <button type=\"button\" ng-disabled=\"\n" +
    "                  !Ctrl._t_s_banner.title ||\n" +
    "                  !Ctrl._t_s_banner.text  ||\n" +
    "                  !Ctrl._t_s_banner.url  ||\n" +
    "                  !Ctrl._t_s_banner.image\n" +
    "                  \" class=\"btn btn-primary upload_img\" ng-click=\"Ctrl.pushTempToSource(Ctrl._t_s_banner, 'sub_banner'); Ctrl._t_s_banner={};\"> Add Sub Banner </button> </div> <hr> <div class=\"form-group\"> <table class=\"table\"> <thead> <tr> <td>Title</td> <td>Text</td> <td>Url</td> <td>Image</td> <td>Action</td> </tr> </thead> <tbody> <tr ng-repeat=\"s_banner in Ctrl.configuration.sub_banner\"> <td>{{s_banner.title}}</td> <td>{{s_banner.text}}</td> <td>{{s_banner.url}}</td> <td><img src=\"{{s_banner.image.url}}\" height=\"100\" width=\"100\"></td> <td> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.editBanner($index, 'sub_banner')\"><i class=\"fa fa-pencil\"></i></a> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.deleteBanner($index, 'sub_banner')\"><i class=\"fa fa-trash\"></i></a> </td> </tr> </tbody> </table> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> Click on Submit To save changes<br> <button type=\"button\" ng-click=\"Ctrl.saveConfiguration()\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"Ctrl.init()\">Reset</button> </div> </form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/sub-categories-edit.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains category content --> <div class=\"content-wrapper\"> <!-- Content Header (Category header) --> <section class=\"content-header\"> <h1> {{Ctrl.sub_title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.sub_title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveCategory()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"Category Name\" required name=\"name\" model=\"Ctrl.category.name\"></form-input> <text-area label=\"Category Description\" model=\"Ctrl.category.description\"></text-area> <div class=\"form-group\"> <div class=\"form-group\"> <div class=\"btn btn-primary\" ng-model=\"file\" ngf-select=\"Ctrl.imageUpload($file, 'category')\" name=\"file\" ngf-pattern=\"'image/*'\" ngf-accept=\"'image/*'\">Select Image</div> <img ng-src=\"{{Ctrl.category.image.url}}\" height=\"100\" width=\"100\"> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.categoryProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.categoryProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> </div> <div class=\"form-group\"> <label for=\"\">Parent Category</label> <select ng-model=\"Ctrl.category.parent\" class=\"form-control\"> <option value=\"{{category._id}}\" ng-repeat=\"category in Ctrl.categories\">{{category.name}}</option> </select> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"\n" +
    "                  Ctrl.category.name =='' ||\n" +
    "                  Ctrl.category.description == '' ||\n" +
    "                  Ctrl.category.image.url == ''\n" +
    "                  \">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"myForm.reset()\">Reset</button> </div> </div></form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/users-edit.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains user content --> <div class=\"content-wrapper\"> <!-- Content Header (User header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <!-- /.box-header --> <div class=\"box box-primary\"> <div class=\"box-header with-border\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <!-- form start --> <form role=\"form\" ng-submit=\"Ctrl.saveUser()\" name=\"myForm\"> <div class=\"box-body\"> <form-input label=\"User Name\" required name=\"name\" model=\"Ctrl.user.name\"></form-input> <form-input label=\"Email\" required name=\"email\" model=\"Ctrl.user.email\"></form-input> <form-input label=\"Phone\" required name=\"phone\" model=\"Ctrl.user.phone\"></form-input> <div class=\"form-group\"> <lable> Role </lable> <select class=\"form-control\" ng-model=\"Ctrl.user.role\"> <option value=\"admin\"> Admin</option> <option value=\"user\"> User</option> <option value=\"seller\"> Seller</option> </select> </div> <div class=\"form-group\"> <lable> User Image </lable> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <div class=\"button btn btn-primary\" ngf-select=\"Ctrl.imageUpload($file, 'image')\">Upload on file select</div> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.imageProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.imageProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> <p>&nbsp;</p> <div class=\"col-md-6\"> <img src=\"{{Ctrl.user.image.url}}\" height=\"100\" width=\"100\"> <input type=\"hidden\" value=\"{{Ctrl.user.logo._id}}\" ng-model=\"Ctrl.user.upload_image\"> </div> </div> </div> <div class=\"form-group\" ng-if=\"Ctrl.user.roles.indexOf('seller') !== -1\"> <lable> Banner </lable> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <div class=\"button btn btn-primary\" ngf-select=\"Ctrl.imageUpload($file, 'banner')\">Upload on file select</div> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.bannerProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.bannerProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> <div class=\"col-md-6\"> <img src=\"{{Ctrl.user.banner.url}}\" height=\"100\" width=\"100\"> <input type=\"hidden\" value=\"{{Ctrl.user.banner._id}}\" ng-model=\"Ctrl.user.upload_banner\"> </div> </div> </div> <div class=\"form-group\" ng-if=\"Ctrl.user.roles.indexOf('seller') !== -1\"> <lable> Logo </lable> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <div class=\"button btn btn-primary\" ngf-select=\"Ctrl.imageUpload($file, 'logo')\">Upload on file select</div> <p>&nbsp;</p> <div class=\"progress progress-sm active\"> <div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{Ctrl.logoProgressPercentage}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{Ctrl.logoProgressPercentage}}%\"> <span class=\"sr-only\"></span> </div> </div> </div> <div class=\"col-md-6\"> <img src=\"{{Ctrl.user.logo.url}}\" width=\"100\" height=\"100\"> <input type=\"hidden\" value=\"{{Ctrl.user.logo._id}}\" ng-model=\"Ctrl.user.upload_logo\"> </div> </div> </div> <!-- /.box-body --> <div class=\"box-footer\"> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"myForm.reset()\">Reset</button> </div> </div></form> </div> <!-- /.box-body --> </div> <!-- /.content --> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> </div> </div> <!-- ./wrapper -->"
  );


  $templateCache.put('views/users.html',
    "<div class=\"wrapper\"> <header-bar></header-bar> <!-- Left side column. contains the logo and sidebar --> <side-bar></side-bar> <!-- Content Wrapper. Contains users content --> <div class=\"content-wrapper\"> <!-- Content Header (Category header) --> <section class=\"content-header\"> <h1> {{Ctrl.title}} <small>Control panel</small> </h1> <ol class=\"breadcrumb\"> <li><a href=\"javascript:void(0)\"><i class=\"fa fa-dashboard\"></i> Home</a></li> <li class=\"active\">Dashboard</li> </ol> </section> <!-- Main content --> <section class=\"content\"> <div class=\"row\"> <div class=\"col-xs-12\"> <div class=\"box\"> <div class=\"box-header\"> <h3 class=\"box-title\">{{Ctrl.title}}</h3> </div> <notification-bar alert-data=\"Ctrl.notify\"></notification-bar> <!-- /.box-header --> <div class=\"box-body\"> <table id=\"example2\" class=\"table table-bordered table-hover\"> <thead> <tr> <th>S.No</th> <th>User Name</th> <th>Email</th> <th>Status</th> <th>Verified</th> <th>User Type</th> <th>Action</th> </tr> <tr> <td></td> <td><input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.search.name\"></td> <td><input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.search.email\"></td> <td><input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.search.status\"></td> <td><input type=\"text\" class=\"form-control\" ng-model=\"Ctrl.search.roles\"></td> <td></td> </tr> </thead> <tbody> <tr ng-repeat=\"user in Ctrl.users | filter:Ctrl.search\"> <td>{{$index+1}}</td> <td>{{user.name}}</td> <td>{{user.email}}</td> <td>{{user.status == 1 ? \"Active\" : \"Inactive\"}}</td> <td> <div ng-if=\"user.verified===true\"> Verified </div> <div ng-if=\"user.verified===false\"> <span style=\"color:red\">Not Verified</span> </div> </td> <td> <b ng-repeat=\"role in user.roles\">{{role}}{{$last ? '' : ', '}}</b> </td> <td> <edit-button href=\"#/users/{{user._id}}\" title=\"Edit User\"></edit-button> <a href=\"javascript:void(0)\" ng-click=\"Ctrl.updateStatus(user._id, !user.status, $index)\" title=\"Update User\"> <i class=\"fa fa-arrow-up\"></i> </a> <delete-button ng-click=\"Ctrl.remove(user._id, $index)\" title=\"Delete User\"></delete-button> </td> </tr> </tbody> <tfoot> <tr> <th>S.No</th> <th>User Name</th> <th>Email</th> <th>Status</th> <th>User Type</th> <th>Action</th> </tr> </tfoot> </table> </div> </div> <!-- /.content --> </div> </div> </section> <!-- /.content-wrapper --> <footer-bar></footer-bar> <div class=\"control-sidebar-bg\"></div> </div> <!-- ./wrapper --></div>"
  );


  $templateCache.put('partials/footer.html',
    "<!-- <footer class=\"main-footer\">\n" +
    "  <div class=\"pull-right hidden-xs\">\n" +
    "    <b>Version</b> 2.3.5\n" +
    "  </div>\n" +
    "  <strong>Copyright &copy; 2014-2016 <a href=\"javascript:void(0)\">Prime</a>.</strong> All rights reserved.\n" +
    "</footer> -->"
  );


  $templateCache.put('partials/headerbar.html',
    "<header class=\"main-header\"> <!-- Logo --> <a href=\"#/dashboard\" class=\"logo\"> <!-- mini logo for sidebar mini 50x50 pixels --> <span class=\"logo-mini\"><b>A</b>LT</span> <!-- logo for regular state and mobile devices --> <span class=\"logo-lg\"><b>Admin</b>LTE</span> </a> <!-- Header Navbar: style can be found in header.less --> <nav class=\"navbar navbar-static-top\"> <!-- Sidebar toggle button--> <a href=\"javascript:void(0)\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\"> <span class=\"sr-only\">Toggle navigation</span> </a> <div class=\"navbar-custom-menu\"> <ul class=\"nav navbar-nav\"> <li class=\"dropdown user user-menu\"> <a href=\"javascript:void(0)\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"> <img src=\"dist/img/user2-160x160.jpg\" class=\"user-image\" alt=\"User Image\"> <span class=\"hidden-xs\">{{CC.name}}</span> </a> <ul class=\"dropdown-menu\"> <!-- User image --> <li class=\"user-header\"> <img src=\"dist/img/user2-160x160.jpg\" class=\"img-circle\" alt=\"User Image\"> <p> {{CC.name}} </p> </li> <!-- Menu Body --> <li class=\"user-body\"> <div class=\"row\"> <div class=\"col-xs-12 text-center\"> <a href=\"javascript:void(0)\">Sales</a> </div> </div> <!-- /.row --> </li> <!-- Menu Footer--> <li class=\"user-footer\"> <div class=\"pull-left\"> <a href=\"#/profile/{{CC._id}}\" class=\"btn btn-default btn-flat\">Profile</a> </div> <log-out-button></log-out-button> </li> </ul> </li> <!-- Control Sidebar Toggle Button --> <li> <a href=\"#change-password\" data-toggle=\"control-sidebar\"><i class=\"fa fa-gears\"></i></a> </li> </ul> </div> </nav> </header>"
  );


  $templateCache.put('partials/sidebar.html',
    "<aside class=\"main-sidebar\"> <!-- sidebar: style can be found in sidebar.less --> <section class=\"sidebar\"> <!-- Sidebar user panel --> <div class=\"user-panel\"> <div class=\"pull-left image\"> <img src=\"dist/img/user2-160x160.jpg\" class=\"img-circle\" alt=\"User Image\"> </div> <div class=\"pull-left info\"> <p>{{CC.name}}</p> <a href=\"javascript:void(0)\"><i class=\"fa fa-circle text-success\"></i> Online</a> </div> </div> <!-- sidebar menu: : style can be found in sidebar.less --> <ul class=\"sidebar-menu\"> <li class=\"treeview\"> <a href=\"javascript:void(0)\"> <i class=\"fa fa-dashboard\"></i> <span>Transactions</span> <span class=\"pull-right-container\"> <i class=\"fa fa-angle-left pull-right\"></i> </span> </a> <ul class=\"treeview-menu\"> <li><a href=\"/#/orders\"><i class=\"fa fa-circle-o\"></i>Orders</a></li> <li><a href=\"/#/finance\"><i class=\"fa fa-circle-o\"></i>Commission Management</a></li> </ul> </li> <li class=\"treeview\"> <a href=\"javascript:void(0)\"> <i class=\"fa fa-dashboard\"></i> <span>Configuration</span> <span class=\"pull-right-container\"> <i class=\"fa fa-angle-left pull-right\"></i> </span> </a> <ul class=\"treeview-menu\"> <li><a href=\"/#/settings/home-page-images\"><i class=\"fa fa-circle-o\"></i> Home Page Images</a></li> <li><a href=\"/#/settings/sub-banner\"><i class=\"fa fa-circle-o\"></i> Sub Banner Upload</a></li> <li><a href=\"/#/settings/main-banner\"><i class=\"fa fa-circle-o\"></i> Main Banner Upload</a></li> <li><a href=\"/#/configuration\"><i class=\"fa fa-circle-o\"></i> Site Configuration</a></li> </ul> </li> <li class=\"treeview\"> <a href=\"javascript:void(0)\"> <i class=\"fa fa-dashboard\"></i> <span>Categories</span> <span class=\"pull-right-container\"> <i class=\"fa fa-angle-left pull-right\"></i> </span> </a> <ul class=\"treeview-menu\"> <li><a href=\"/#/categories\"><i class=\"fa fa-circle-o\"></i> View Categories</a></li> <li><a href=\"/#/add-categories\"><i class=\"fa fa-circle-o\"></i> Add Categories</a></li> <li><a href=\"/#/add-sub-categories\"><i class=\"fa fa-circle-o\"></i> Add Sub Categories</a></li> </ul> </li> <li class=\"treeview\"> <a href=\"javascript:void(0)\"> <i class=\"fa fa-dashboard\"></i> <span>Users</span> <span class=\"pull-right-container\"> <i class=\"fa fa-angle-left pull-right\"></i> </span> </a> <ul class=\"treeview-menu\"> <li><a href=\"/#/users\"><i class=\"fa fa-circle-o\"></i> View Users</a></li> <li><a href=\"/#/add-users\"><i class=\"fa fa-circle-o\"></i> Add Users</a></li> </ul> </li> <li><a href=\"/#/product\"><i class=\"fa fa-circle-o text-red\"></i> <span>Product</span></a></li> <li class=\"treeview\"> <a href=\"javascript:void(0)\"> <i class=\"fa fa-dashboard\"></i> <span>Pages</span> <span class=\"pull-right-container\"> <i class=\"fa fa-angle-left pull-right\"></i> </span> </a> <ul class=\"treeview-menu\"> <li><a href=\"/#/pages\"><i class=\"fa fa-circle-o\"></i> View Pages</a></li> <li><a href=\"/#/add-pages\"><i class=\"fa fa-circle-o\"></i> Add Pages</a></li> </ul> </li> <li class=\"treeview\"> <a href=\"javascript:void(0)\"> <i class=\"fa fa-dashboard\"></i> <span>Email Templates</span> <span class=\"pull-right-container\"> <i class=\"fa fa-angle-left pull-right\"></i> </span> </a> <ul class=\"treeview-menu\"> <li><a href=\"/#/emailtemplates\"><i class=\"fa fa-circle-o\"></i> View Email Templates</a></li> <li><a href=\"/#/add-emailtemplates\"><i class=\"fa fa-circle-o\"></i> Add Email Templates</a></li> </ul> </li> </ul> </section> <!-- /.sidebar --> </aside>"
  );

}]);
