//Player Card
var moment = require('moment');

var makePlayer = function(name, gender, photo, email, phone, sport, position, 
                          location, availability, travelDist, exp, skillLvl,
                          friendiness, competitiveness, skillRating){
    var player = {
        name: name,
        gender: gender,
        email: email,
        phone: phone,
        sport: sport,
        position: position,
        location: location,
        availability: availability,
        travelDist: travelDist,
        exp: exp,
        skillLvl: skillLvl,
        friendiness: friendiness,
        competitiveness: competitiveness,
        skillRating: skillRating
    };

    return player;
};

var makeGame = function(sport, position, date, location, locationName, leagueLvl, notes, captainId, teamName, contact){
    var game = {
        sport: sport,
        position: position,
        date: date,
        location: location,
        locationName: locationName,
        leagueLvl: leagueLvl,
        notes: notes,
        captainId: captainId,
        teamName: teamName,
        contact: contact
    };
};

var players = [];
var games = [];
players.push(makePlayer('Zack', 1, 'http://41.media.tumblr.com/d53e00a1c9e7953722976b60ff0fa9a6/tumblr_mws4c4HWWw1qffjqso1_500.jpg', 'zb@bn.co', '207-867-5309', 'Volleyball', 'hitter', 14607, [1,0,1,1,0,0,1], 15, 5, 'Intermediate', 4, 4, 3));
players.push(makePlayer('Wesley', 0, 'http://41.media.tumblr.com/d53e00a1c9e7953722976b60ff0fa9a6/tumblr_mws4c4HWWw1qffjqso1_500.jpg', 'zb@bn.co', '207-867-5309', 'Volleyball', 'setter', 14607, [1,0,1,1,0,1,1], 15, 20, 'Intermediate', 2, 4, 5));
players.push(makePlayer('Bessler', 1, 'http://41.media.tumblr.com/d53e00a1c9e7953722976b60ff0fa9a6/tumblr_mws4c4HWWw1qffjqso1_500.jpg', 'zb@bn.co', '207-867-5309', 'Volleyball', 'blocker', 14607, [1,0,1,0,0,0,1], 15, 2, 'Recreation', 5, 5, 1));

games.push(makeGame('Volleyball', 'hitter', moment('2015-3-29'), 'Rochester, NY', 'Hotshots', 'Intermediate', 'We need someone cool', 2, 'Team Win', '585-867-5390'));
games.push(makeGame('Volleyball', 'setter', moment('2015-3-29'), 'Rochester, NY', 'Hotshots', 'Intermediate', 'We need someone cool', 2, 'Team Win', '585-867-5390'));
games.push(makeGame('Volleyball', 'hitter', moment('2015-3-29'), 'Rochester, NY', 'Hotshots', 'Intermediate', 'We need someone cool', 2, 'Team Win', '585-867-5390'));


module.exports = {
    sports: ['Baseball', 'Volleyball', 'Hockey'],
    leagueLvl: ['Recreation', 'Intermediate', 'Advanced'],
    volleyballPos: ['hitter', 'setter', 'blocker'],
    players: players,
    games: games
};