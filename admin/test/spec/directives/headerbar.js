'use strict';

describe('Directive: headerBar', function () {

  // load the directive's module
  beforeEach(module('eCommerceAdminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<header-bar></header-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the headerBar directive');
  }));
});
