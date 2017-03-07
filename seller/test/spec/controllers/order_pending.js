'use strict';

describe('Controller: OrderPendingCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var OrderPendingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderPendingCtrl = $controller('OrderPendingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderPendingCtrl.awesomeThings.length).toBe(3);
  });
});
