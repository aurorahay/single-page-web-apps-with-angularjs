(function() {
  "use strict";
  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MenuService','MyInfoService'];
  function MyInfoController(MenuService, MyInfoService) {
    var myInfoController = this;

    myInfoController.info = MyInfoService.getMyInfo();

    if (Object.keys(myInfoController.info).length) {
     MenuService.getMenuItem(myInfoController.info.favorite)
      .then(function(response){
          myInfoController.favoriteDetails = response;
      });
    } else {
      myInfoController.signUp = true;
    }
  }
})();
