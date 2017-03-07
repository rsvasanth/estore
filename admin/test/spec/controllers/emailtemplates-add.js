'use strict';

describe('Controller: EmailtemplatesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceAdminApp'));

  var EmailtemplatesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailtemplatesAddCtrl = $controller('EmailtemplatesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EmailtemplatesAddCtrl.awesomeThings.length).toBe(3);
  });
});
