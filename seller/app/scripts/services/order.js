'use strict';

/**
 * @ngdoc service
 * @name ecommercesellerApp.order
 * @description
 * # order
 * Service in the ecommercesellerApp.
 */
angular.module('ecommercesellerApp')
  .service('order', (['$resource','url','sellers','$window', function($resource,url,sellers,$window) {
  
    var main_url = url+sellers+"tracking/getStatus?status=:status";
    var authorization = $window.localStorage['Authorization'];
    return $resource(main_url,{status:'@status'},{
    get: {
      method: 'GET',
      headers:{Authorization:authorization},
    }
  });
}]));
