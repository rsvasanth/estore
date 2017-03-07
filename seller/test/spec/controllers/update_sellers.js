'use strict';

describe('Controller: UpdateSellersCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var UpdateSellersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateSellersCtrl = $controller('UpdateSellersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UpdateSellersCtrl.awesomeThings.length).toBe(3);
  });
});
