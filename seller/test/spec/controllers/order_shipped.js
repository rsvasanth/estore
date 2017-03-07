'use strict';

describe('Controller: OrderShippedCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var OrderShippedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderShippedCtrl = $controller('OrderShippedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderShippedCtrl.awesomeThings.length).toBe(3);
  });
});
