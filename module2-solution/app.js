(function(){
  'user strict';
  var app = angular.module('ShoppingListCheckOff', []);

  var ToBuyController  = function(ShoppingListCheckOffService) {
    var buyItem = this;
    var service = ShoppingListCheckOffService;
    buyItem.message = "Everything is bought!";

    buyItem.itemsToBuy = service.getToBuy();
    buyItem.buy = function (item, itemIndex) {
      service.removeToBuyItem(itemIndex);
      service.addBoughtItem(item)
    };
  };

  var AlreadyBoughtController  = function(ShoppingListCheckOffService) {
    var boughtItem = this;
    var service = ShoppingListCheckOffService;
    boughtItem.message = "Nothing bought yet";
    boughtItem.bought = service.getBought();
  };

  var ShoppingListCheckOffService = function() {
    var service = this;

    var toBuy = [
      {name: 'cups', quantity: 8},
      {name: 'diapers', quantity: 100},
      {name: 'socks', quantity: 17},
      {name: 'fingers', quantity: 3},
      {name: 'dimples', quantity: 381}
    ];
    var bought = [];

    service.getToBuy = function() {
      return toBuy;
    };

    service.getBought = function() {
      return bought;
    };

    service.addBoughtItem = function(item) {
      bought.push(item);
    };

    service.removeToBuyItem= function (itemIndex) {
      toBuy.splice(itemIndex, 1);
    };

    return service;
  };

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  app.controller('ToBuyController', ToBuyController);
  app.controller('AlreadyBoughtController', AlreadyBoughtController);
  app.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
})();
