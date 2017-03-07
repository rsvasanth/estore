'use strict';

describe('Controller: EmailtemplatesCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceAdminApp'));

  var EmailtemplatesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailtemplatesCtrl = $controller('EmailtemplatesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EmailtemplatesCtrl.awesomeThings.length).toBe(3);
  });
});
