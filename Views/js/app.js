
// Declare app level module which depends on filters, and services
angular.module('FreeAgent', [
    'ngRoute',
    'FreeAgent.filters',
    'FreeAgent.services',
    'FreeAgent.directives',
    'FreeAgent.controllers'
])
.constant('AppConfig', {

})
.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider.when('/splash', {
        templateUrl: 'templates/splash.html',
        controller: 'splash'
    });
    
    $routeProvider.when('/matches', {
        templateUrl: 'templates/matches.html',
        controller: 'matches'
    });

    $routeProvider.when('/team', {
        templateUrl: 'templates/team.html',
        controller: 'team'
    });
    
    // $routeProvider.when('/', {
    //     templateUrl: 'templates/home.html',
    //     controller: 'home'
    // });
    $routeProvider.otherwise({redirectTo: '/splash'});
});
