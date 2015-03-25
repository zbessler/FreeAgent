var data = require('./Data');
var lodash = require('lodash');
var moment = require('moment');

// sort games by date
var searchGames = function(sport, location, date, position, leagueLvl){
    var retval = search(data.games, sport, location, date, position, leagueLvl);
    return retval;
};

var searchPlayer = function(sport, location, date, position, leagueLvl, skillLvl){
    var retval = search(data.players, sport, location, date, position, leagueLvl, skillLvl);
    return retval;
};

var search = function(SearchObj, sport, location, date, position, leagueLvl, skillLvl){
    var retval = [];
    //console.log(SearchObj)
    lodash.each(SearchObj, function(g){
        var passed = true;
        if(lodash.has(sport, 'sport')) passed = false;
        //Check location
        if(date)
            if(g.availability[moment(date).day()] !== 1) passed = false;
        if(position)
            if(g.position !== position) passed = false;
        if(leagueLvl)
            if(g.leagueLvl !== leagueLvl) passed = false;
        if(skillLvl)
            if(g.skillLvl < skillLvl) passed = false;

        if(passed) retval.push(g);
    });
    console.log(retval);
    return retval;
};




module.exports = {
    searchPlayer: searchPlayer,
    searchGames: searchGames
};