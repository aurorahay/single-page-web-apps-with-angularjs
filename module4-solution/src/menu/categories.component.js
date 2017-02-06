(function() {
  'use strict';
  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/menu/templates/categories.component.template.html',
    bindings : {
      categories: '<'
    }
  });
})();
