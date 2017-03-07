'use strict';

describe('Service: siteConfiguration', function () {

  // load the service's module
  beforeEach(module('eCommerceAdminApp'));

  // instantiate service
  var siteConfiguration;
  beforeEach(inject(function (_siteConfiguration_) {
    siteConfiguration = _siteConfiguration_;
  }));

  it('should do something', function () {
    expect(!!siteConfiguration).toBe(true);
  });

});
