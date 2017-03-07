'use strict';

describe('Controller: OrderReturnedCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var OrderReturnedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderReturnedCtrl = $controller('OrderReturnedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderReturnedCtrl.awesomeThings.length).toBe(3);
  });
});
