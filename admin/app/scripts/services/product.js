'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Product
 * @description
 * # Product
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('Product', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {

    return $resource(endpoint + '/products', null, {
       getAllProducts: {
         url: endpoint + '/products/get-products',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       },
       getApprovedProducts: {
         url: endpoint + '/products/get-approved-products',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       },
       getNonApprovedProducts: {
         url: endpoint + '/products/get-non-approved-products',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       },
       updateProductStatus: {
         url: endpoint + '/products/update-product-status/:id/:status',
         method: 'PUT',
         headers: {"Authorization": sessionService.get("token")}
       },
       updateProduct: {
         url: endpoint + '/products/update-product/:id',
         method: 'PUT',
         headers: {"Authorization": sessionService.get("token")}
       },
       getSingleProduct: {
         url: endpoint + '/products/get-single-product/:id',
         method: 'GET',
         headers: {"Authorization": sessionService.get("token")}
       }
     });
  }]);
