'use strict';

describe('Controller: OutOfStockProductsCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var OutOfStockProductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OutOfStockProductsCtrl = $controller('OutOfStockProductsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OutOfStockProductsCtrl.awesomeThings.length).toBe(3);
  });
});
