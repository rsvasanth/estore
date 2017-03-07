'use strict';

describe('Directive: albums', function () {

  // load the directive's module
  beforeEach(module('ecommercesellerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<albums></albums>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the albums directive');
  }));
});
