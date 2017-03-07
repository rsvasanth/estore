'use strict';

describe('Service: emailtemplates', function () {

  // load the service's module
  beforeEach(module('eCommerceAdminApp'));

  // instantiate service
  var emailtemplates;
  beforeEach(inject(function (_emailtemplates_) {
    emailtemplates = _emailtemplates_;
  }));

  it('should do something', function () {
    expect(!!emailtemplates).toBe(true);
  });

});
