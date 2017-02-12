(function () {
"use strict";

angular.module('public')
.service('MyInfoService', MyInfoService);

function MyInfoService() {
  var service = this;

  var myinfo = {};

  service.saveMyInfo = function (info) {
    myinfo.firstName = info.firstName;
    myinfo.lastName = info.lastName;
    myinfo.email = info.email;
    myinfo.phone = info.phone;
    myinfo.favorite = info.favorite;
  };

  service.getMyInfo = function () {
    return myinfo;
  }
}
})();
