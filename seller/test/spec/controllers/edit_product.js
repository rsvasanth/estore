'use strict';

describe('Controller: EditProductCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var EditProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditProductCtrl = $controller('EditProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditProductCtrl.awesomeThings.length).toBe(3);
  });
});
