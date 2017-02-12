(function() {
"use strict";

angular.module('common')
.directive('menuItemValidator', MenuItemValidator);

MenuItemValidator.$inject = ['MenuService'];
function MenuItemValidator(MenuService) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: link
  }

  function link(scope, element, attrs, ctrl) {
    element.on('blur', function() {
      if (!ctrl || !element.val()) {
        return ctrl.$setValidity("menuItem", true);
      }
      return MenuService.getMenuItem(ctrl.$modelValue)
      .then(function(response){
          if (response.error) {
            ctrl.$setValidity("menuItem", false);
          } else {
            ctrl.$setValidity("menuItem", true);
          }
      });
    });
  }
}
})();
