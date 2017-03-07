'use strict';

describe('Controller: ActiveProductCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var ActiveProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActiveProductCtrl = $controller('ActiveProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActiveProductCtrl.awesomeThings.length).toBe(3);
  });
});
