/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('PlayerService', [])
.factory('Player', function ($http, $q, $log) {

    var _talkToNode = function(url, args) {
        var promise = $q.defer();
        $http.post(url, args)
        .then(function(response){
            promise.resolve(response.data);
        }, function(e){
            $log.error(e);
            promise.reject(e.data);
        });
        return promise.promise;
    };

    return {
        // Gets
        CreatePlayer: function(playerInfo){
            return _talkToNode('/player/CreatePlayer', playerInfo);
        }
    };
});