'use strict';

describe('Controller: OrderDeliveredCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var OrderDeliveredCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderDeliveredCtrl = $controller('OrderDeliveredCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderDeliveredCtrl.awesomeThings.length).toBe(3);
  });
});
