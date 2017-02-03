(function(){
  'user strict';
  var app = angular.module('LunchCheck', []);

  var LunchCheckController = function($scope) {
    $scope.message = "";
    $scope.lunch = "";
    $scope.fontColor = "";
    $scope.borderColor = "";

    $scope.check = function() {
      var lunchLength = $scope.lunch.split(',');
      var lunchCount = 0;
      for (var i = 0; i < lunchLength.length; i++) {
        if (lunchLength[i].trim()) {
          lunchCount ++;
        }
      }

      if (!$scope.lunch.length) {
        $scope.fontColor = "red";
        $scope.borderColor = "red-border";
        $scope.message = "Empty! Please type in your lunch list to check!";
      } else if (lunchCount > 3) {
        $scope.fontColor = "green";
        $scope.borderColor = "green-border";
        $scope.message = "Too much!";
      } else if (lunchCount <= 3) {
        $scope.fontColor = "green";
        $scope.borderColor = "green-border";
        $scope.message = "Enjoy!";
      }

    }
  };

  LunchCheckController.$inject = ['$scope'];
  app.controller('LunchCheckController', LunchCheckController);
})();
