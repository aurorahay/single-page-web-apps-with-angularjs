(function(){

  var app = angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', ['$scope', 'MenuSearchService', NarrowItDownController])
  .service('MenuSearchService',['$http', 'ApiBasePath', MenuSearchService])
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function NarrowItDownController ($scope, MenuSearchService) {
    var ndc = this;
    ndc.found = [];
    ndc.searched = false;
    ndc.getMatchedMenuItems = getMatchedMenuItems;
    ndc.removeItem = removeItem;

    function getMatchedMenuItems() {
      if (ndc.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(ndc.searchTerm);

        promise.then(function(data) {
          ndc.searched = true;
          ndc.found = data;
        })
        .catch(function(error){
          console.log("Something went wrong!");
        });
      } else {
        ndc.searched = true;
        ndc.found = [];
      }
    }

    function removeItem(itemIndex) {
      ndc.found.splice(itemIndex, 1);
    }
  }

  function MenuSearchService ($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      if (searchTerm) {
        return $http({
            method: 'GET',
            url: (ApiBasePath + '/menu_items.json')
          }).then(function (result) {
              // process result and only keep items that match
              var foundItems = result.data.menu_items.filter(function(item){
                var description  = item.description;
                return description .toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
              });

              // return processed items
              return foundItems;
          });
      } else {
        return [];
      }
    }
  }

  function FoundItems() {
    var ddo = {
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&',
      },
      templateUrl: 'foundItems.html',
      controller: FoundItemsDirectiveController,
      controllerAs:'items',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var items = this;
  }

})();
