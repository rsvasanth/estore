'use strict';

describe('Controller: CategoriesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceAdminApp'));

  var CategoriesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoriesEditCtrl = $controller('CategoriesEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CategoriesEditCtrl.awesomeThings.length).toBe(3);
  });
});
