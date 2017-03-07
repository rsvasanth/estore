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
