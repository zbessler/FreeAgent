/* Controllers */

angular.module('Spice.controllers', [])
  .controller('Main', function($scope, $routeParams, AppConfig) {
    $scope.welcomeHeader = 'Welcome to Spice Boys Vintning and Brewing';
    $scope.welcomeBody = 'Drink the Spice; Enjoy the Spice Flow the Spice; Be the Spice';
    $scope.aboutH1 = 'ABOUT US';
    $scope.aboutP1 = 'The spice boys, once lead by Erica "The D" Bonte, were a group of mild mannered young men with hankering for anything with an abv above five percent. Begining with unceremoniously early exit by Eric "MasterRace" Parker, a flurry of departures, starting with Michael "Ladyboner" Bova and finally their leader. Leaving behind Zachary "Dad" Bessler to raise Andrew "Hitler" Vrankovic on his own.';
    $scope.aboutH2 = 'HISTORY';
    $scope.aboutP2 = 'Zachary purchased the winery site in 2013. The moment he saw it he fell in love with the "sweet angles". Zachary and Andrew quickly purchased necessary supplies and began scientifically engineer and preparing the wine and equipment until they started getting pretty drunk and doing whatever they wanted. That created the taste you know and love today.';
    $scope.aboutImg1 = 'img/boys_suits.jpg';
    $scope.logo = 'img/logos/sb_logo.png';
    $scope.config = AppConfig;
    Parse.initialize(AppConfig.parseAppId, AppConfig.parseJsKey);
  })
  .controller('Home', ['$scope','$rootScope' ,'$routeParams', function($scope, $rootScope, $routeParams) {

    $rootScope.product = 'Wines';
    $scope.productHeader = 'OUR WINES';
    $scope.aboutImg2 = 'img/old_equip.jpg';
    $rootScope.outfit = 'Spice Boys Vineyards';

    var wines = Parse.Object.extend("Wine");
    var query = new Parse.Query(wines);
    query.find({
      success: function(wines) {
        $scope.wines = wines;
        $scope.$apply();
      },
      error: function(object, error) {
        console.log(error);
      }
    });



  }])
  .controller('Beer', ['$scope','$rootScope' ,'$routeParams', function($scope, $rootScope, $routeParams) {

    $rootScope.product = 'Beers';
    $scope.productHeader = 'OUR BEERS';
    $scope.aboutImg2 = 'https://pug-o-matic.me/assets/pug-aed5ccffa1461fe081559c9b05afda98.png';
    $rootScope.outfit = 'Spice Boys Brewery';

  }]);