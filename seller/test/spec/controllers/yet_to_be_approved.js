'use strict';

describe('Controller: YetToBeApprovedCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var YetToBeApprovedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YetToBeApprovedCtrl = $controller('YetToBeApprovedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(YetToBeApprovedCtrl.awesomeThings.length).toBe(3);
  });
});
