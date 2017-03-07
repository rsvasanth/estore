'use strict';

describe('Controller: OrderPickUpCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var OrderPickUpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderPickUpCtrl = $controller('OrderPickUpCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderPickUpCtrl.awesomeThings.length).toBe(3);
  });
});
