'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.Category
 * @description
 * # Category
 * Factory in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .factory('Category', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + '/categories', {}, {
      getAllCategories: {
        url: endpoint +  "/categories/get-categories",
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      getApprovedCategories: {
        url: endpoint +  "/categories/get-approved-categories",
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      getNonApprovedCategories: {
        url: endpoint +  "/categories/get-non-approved-categories",
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      updateCategoryStatus: {
        url: endpoint +  "/categories/update-category-status/:id",
        method: 'POST',
        headers: {"Authorization": sessionService.get("token")}
      },
      updateCategory: {
        url: endpoint +  "/categories/update-category/:id",
        method: 'PUT',
        headers: {"Authorization": sessionService.get("token")}
      },
      getSingleCategory: {
        url: endpoint +  "/categories/get-single-category/:id",
        params: {id: "@id"},
        method: 'GET',
        headers: {"Authorization": sessionService.get("token")}
      },
      deleteSingle: {
        url: endpoint +  "/categories/:id",
        method: 'DELETE',
        headers: {"Authorization": sessionService.get("token")}
      },
      addSingle: {
        method: 'POST',
        headers: {"Authorization": sessionService.get("token")}
      }
    });
  }]);
