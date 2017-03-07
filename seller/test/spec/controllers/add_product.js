'use strict';

describe('Controller: AddProductCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var AddProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddProductCtrl = $controller('AddProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddProductCtrl.awesomeThings.length).toBe(3);
  });
});
