'use strict';

describe('Controller: SiteConfigurationCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceAdminApp'));

  var SiteConfigurationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SiteConfigurationCtrl = $controller('SiteConfigurationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SiteConfigurationCtrl.awesomeThings.length).toBe(3);
  });
});
