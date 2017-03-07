'use strict';

describe('Controller: TrackOrderCtrl', function () {

  // load the controller's module
  beforeEach(module('ecommercesellerApp'));

  var TrackOrderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrackOrderCtrl = $controller('TrackOrderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrackOrderCtrl.awesomeThings.length).toBe(3);
  });
});
