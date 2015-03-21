
// Declare app level module which depends on filters, and services
angular.module('Spice', [
    'ngRoute',
    'Spice.filters',
    'Spice.services',
    'Spice.directives',
    'Spice.controllers'
])
.constant('AppConfig', {
    'version': '3',
    'parseAppId': 'rKS4FvpPwIN1sCSe9jzclbCHT7dU9Bc6yb1aYTxo',
    'parseJsKey': 'k7xpt81zqRsx57ITWPgqsB2SL4JO2pvJLWo8j6mx'
})
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'Home'});
    $routeProvider.when('/beer', {templateUrl: 'partials/home.html', controller: 'Beer'});
    $routeProvider.otherwise({redirectTo: '/'});

}]);
