/* Controllers */

angular.module('FreeAgent.controllers', [])
  .controller('Main', function($scope, $routeParams, AppConfig) {
    $scope.config = AppConfig;

  })
  .controller('Home', function($scope, $rootScope, $routeParams) {



  });
  