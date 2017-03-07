'use strict';

describe('Controller: InactiveProductsCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var InactiveProductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InactiveProductsCtrl = $controller('InactiveProductsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InactiveProductsCtrl.awesomeThings.length).toBe(3);
  });
});
