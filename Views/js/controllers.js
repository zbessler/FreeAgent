/* Controllers */

angular.module('FreeAgent.controllers', [])
.controller('Main', function($scope) {


})
.controller('splash', function($scope) {
  

})
.controller('player', function($scope, PlayerService) {
  
  console.log('I loaded:player');

  Player.CreatePlayer({
        username: 'username',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email',
        sunday: [1,0,1,0,0,1,1],
  });
  

})
.controller('matches', function($scope) {
    $scope.matches = [
    {
        firstname: 'Nick',
        lastname: 'Vernetti',
        sport: 'Volleyball',
        city: 'Rochester',
        state: 'New York',
        country: 'USA',
        age: 25,
        skill: 'Beginner',
        gender: 'Male',
        imgurl: '/img/Nick_Crop.png'
    },{
        firstname: 'Megan',
        lastname: 'Barton',
        sport: 'Volleyball',
        city: 'Rochester',
        state: 'New York',
        country: 'USA',
        age: 31,
        skill: 'Expert',
        gender: 'Female',
        imgurl: '/img/Megan_Crop.png'
    },{
        firstname: 'Zack',
        lastname: 'Bessler',
        sport: 'Volleyball',
        city: 'Rochester',
        state: 'New York',
        country: 'USA',
        age: 27,
        skill: 'Beginner',
        gender: 'Male',
        imgurl: '/img/Zack_Crop.png'
    },{
        firstname: 'Emily',
        lastname: 'Piccione',
        sport: 'Volleyball',
        city: 'Rochester',
        state: 'New York',
        country: 'USA',
        age: 24,
        skill: 'Intermediate',
        gender: 'Female',
        imgurl: '/img/Emily_Crop.png'
    }];

})
.controller('team', function($scope) {
  $scope.sports = ['Volleyball', 'Baseball', 'Hockey'];
  $scope.selectedSport = '*Sport';
  $scope.gameDates = ['July 23,1983', 'Dec 25, 2015'];
  $scope.selectedGameDate = '*Date';
  $scope.gameTimes = ['7:00pm','8:00pm'];
  $scope.selectedGameTime = ['*Time'];

  $scope.positions = ['Hitter', 'Setter', 'Blocker'];
  $scope.selectedPosition = 'Position';
  $scope.skills = ['Recreation', 'Intermediate', 'Advanced'];
  $scope.selectedSkill = 'Skill Level';
  $scope.genders = ['Male', 'Female', 'Coed'];
  $scope.selectedGender = 'Gender';

});

  