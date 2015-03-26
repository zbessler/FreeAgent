var Sequelize = require('sequelize');
var q = require('q');
var connection = null;
var lodash = require('lodash');
var util = require('../utilities');
var logger = require('../../../util/Logger');

var PlayerRating = null;


var init = {
    loadModel: function(dbConnection){
        connection = dbConnection;

        PlayerRating = connection.define('PlayerRating', 
        {
            id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            playerid: { type: Sequelize.INTEGER, allowNull: false },
            sportid: { type: Sequelize.INTEGER, allowNull: false },
            friendliness: { type: Sequelize.INTEGER, allowNull: false },
            reliability: { type: Sequelize.INTEGER, allowNull: false },
            competitiveness: { type: Sequelize.INTEGER, allowNull: false },
            skill: { type: Sequelize.INTEGER, allowNull: false }
        },
        {
            tableName: 'PlayerRating', // this will define the table's name
        });
    }
};

var methods = {
    searchByplayerid: function(playerid){
        var tags = ['PlayerRating.js', 'searchByplayerid'];
        var promise;
        promise = q.defer();
        PlayerRating.find({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            util.methods.onComplete(error, doc, tags, promise, 'Could not find Players');
        });
        return promise.promise;
    },
    searchBySportid: function(sportid){
        var tags = ['PlayerRating.js', 'searchBySportid'];
        var promise = q.defer();
        PlayerRating.findAll({
            where: {
                sportid: sportid
            }
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find Players');
        });
        return promise.promise;
    },
    searchByRatingid: function(ratingid){
        var tags = ['PlayerRating.js', 'searchByRatingid'];
        var promise = q.defer();
        PlayerRating.findAll({
            where: {
                ratingid: ratingid
            }
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find Players');
        });
        return promise.promise;
    },

    search: function(PlayerRating) {
        var tags = ['PlayerRating.js', 'search'];
        var promise = q.defer();
        PlayerRating.findAll({
            where: PlayerRating
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find Players');
        });
        return promise.promise;
    },



    getPlayerAvgRatings: function(playerid){
        var tags = ['PlayerRating.js', 'getPlayerRatings'];
        var promise;
        promise = q.defer();
        PlayerRating.find({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            if(error){
                logger.ERROR(error, tags);
                promise.reject(error);
            }else if(!doc){
                // This happens if the wasnt anything found but there was also no error.
                logger.ERROR('Could not find players', tags);
                promise.reject('Could not find players');
            }else{
                var retval = [];
                var sportsRating = [];

                lodash.forEach(doc, function(o){
                    if(sportsRating[o.dataValues.sportid]) {
                        var count = sportsRating[o.dataValues.sportid].count;
                        var curr = sportsRating[o.dataValues.sportid];
                        curr.competitiveness = (curr.competitiveness * count + o.dataValues.competitiveness)/(count+1);
                        curr.friendliness = (curr.friendliness * count + o.dataValues.friendliness)/(count+1);
                        curr.reliability = (curr.reliability * count + o.dataValues.reliability)/(count+1);
                        curr.skill = (curr.skill * count + o.dataValues.skill)/(count+1);
                        curr.count = count + 1;
                        sportsRating[o.dataValues.sportid] = curr;
                        //add to avg
                    }else{
                        sportsRating[o.dataValues.sportid] = {
                            competitiveness: o.dataValues.competitiveness,
                            friendliness: o.dataValues.friendliness,
                            reliability: o.dataValues.reliability,
                            skill: o.dataValues.reliability,
                            count: 1
                        };
                    }
                    retval.push(o.dataValues);
                    
                });

                promise.resolve(retval);
            }
        });
        return promise.promise;
    },


    createPlayerRating: function(PlayerRating){
        var tags = ['PlayerRating.js', 'createPlayerRating'];
        var promise = q.defer();
        PlayerRating.create({
            playerid: PlayerRating.playerid,
            skillLvl: PlayerRating.skillLvl,
            sportid: PlayerRating.sportid
        })
        .complete(function(error, doc){
            util.methods.onCompleteCreate(error, doc, tags, promise, 'PlayerRating ' + PlayerRating.id + ' added to db');
        });
        return promise.promise;
    },

    deletePlayerRating: function(playerid){
        var tags = ['PlayerRating.js', 'deletePlayerRating'];
        var promise = q.defer();
        PlayerRating.destroy({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            util.methods.onComplete(error, doc, tags, promise, 'Could not find Category');
        });
        return promise.promise;
    }
};

module.exports = {
    init: init,
    PlayerRating: PlayerRating,
    methods: methods
};