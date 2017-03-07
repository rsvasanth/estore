'use strict';

describe('Controller: CategoriesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceAdminApp'));

  var CategoriesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoriesAddCtrl = $controller('CategoriesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CategoriesAddCtrl.awesomeThings.length).toBe(3);
  });
});
