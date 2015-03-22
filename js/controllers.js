/* Controllers */

angular.module('FreeAgent.controllers', [])
.controller('Main', function($scope) {


})
.controller('splash', function($scope) {
  

})
.controller('home', function($scope) {
  
  console.log('I loaded:home');

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
  $scope.countries = ['United states'];
  $scope.selectedCountries = 'Country';
  $scope.states = ['New York', 'Massachusetts'];
  $scope.selectedState = 'State';
  $scope.cities = ['Rochester', 'NYC'];
  $scope.selectedCity = 'City';
  $scope.sports = ['Volleyball', 'Baseball', 'Hockey'];
  $scope.selectedSport = 'Sport';

  $scope.positions = ['Hitter', 'Setter', 'Blocker'];
  $scope.selectedPosition = 'Position';
  $scope.skills = ['Recreation', 'Intermediate', 'Advanced'];
  $scope.selectedSkill = 'Skill';
  $scope.ages = ['16-20', '21-30', '30+'];
  $scope.selectedAge = 'Age';

});

  