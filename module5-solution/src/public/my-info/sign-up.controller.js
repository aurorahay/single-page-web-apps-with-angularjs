(function() {
  "use strict";
  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', 'MyInfoService'];
  function SignUpController(MenuService, MyInfoService) {
    var signUpController = this;

    signUpController.submit = function(valid) {
      if (valid) {
        var myInfo = {
          firstName: signUpController.firstName,
          lastName: signUpController.lastName,
          email: signUpController.email,
          phone: signUpController.phone,
          favorite: signUpController.favorite
        }
          MyInfoService.saveMyInfo(myInfo);
          signUpController.message = "Thank you! Your information has been saved.";
          signUpController.menuItemError = "";
      }
    }
  }
})();
