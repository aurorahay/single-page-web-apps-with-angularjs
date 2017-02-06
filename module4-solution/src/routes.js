(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/menu/templates/home.template.html'
    })
    .state('categories', {
      url: '/categories',
      controller: 'CategoriesController as $ctrl',
      templateUrl: 'src/menu/templates/categories-main.template.html',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories().then(function(categories) {
            return categories;
          });
        }]
      }
    })
    .state('categories.items', {
      url: '/{catId}/items',
      templateUrl: 'src/menu/templates/items.template.html',
      controller: "ItemsController as $ctrl",
      resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.catId).then(function(items) {
            return items;
          });
        }]
      }
    });
  }
})();
