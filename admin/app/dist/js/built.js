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
  .config(function($routeProvider) {
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

  })
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
  .directive('onFinishRender', function($timeout) {
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
  })
  .directive('editButton', function($timeout) {
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
  })
  .directive('deleteButton', function($timeout) {
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
  })
  .directive('viewButton', function($timeout) {
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
  })
  .directive('statusButton', function($timeout) {
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
  })
  .directive('formInput', function($timeout) {
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
  })
  .directive('textArea', function($timeout) {
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
  })
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
  .directive('dataTable', function($timeout) {
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
  })
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
