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
