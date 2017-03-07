'use strict';

describe('Controller: PagesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceAdminApp'));

  var PagesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PagesAddCtrl = $controller('PagesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PagesAddCtrl.awesomeThings.length).toBe(3);
  });
});
