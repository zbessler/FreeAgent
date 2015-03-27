var Sequelize = require('sequelize');
var q = require('q');
var connection = null;
var lodash = require('lodash');
var util = require('../utilities');
var logger = require('../../../Utils/Logger');

var PlayerSport = null;


var init = {
    loadModel: function(dbConnection){
        connection = dbConnection;

        PlayerSport = connection.define('PlayerSport', 
        {
            id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            playerid: { type: Sequelize.INTEGER, allowNull: false },
            sportid: { type: Sequelize.INTEGER, allowNull: false },
            skillLvl: { type: Sequelize.INTEGER, allowNull: false }
        },
        {
            tableName: 'PlayerSport', // this will define the table's name
        });
    }
};

var methods = {
    searchByPlayerid: function(playerid){
        var tags = ['PlayerSport.js', 'searchByPlayerid'];
        var promise;
        promise = q.defer();
        PlayerSport.find({
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
        var tags = ['PlayerSport.js', 'searchBySportid'];
        var promise = q.defer();
        PlayerSport.findAll({
            where: {
                sportid: sportid
            }
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find Players');
        });
        return promise.promise;
    },

    search: function(playerSport) {
        var tags = ['PlayerSport.js', 'search'];
        var promise = q.defer();
        PlayerSport.findAll({
            where: playerSport
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find Players');
        });
        return promise.promise;
    },


    createPlayerSport: function(playerSport){
        var tags = ['PlayerSport.js', 'createPlayerSport'];
        var promise = q.defer();
        PlayerSport.create({
            playerid: playerSport.playerid,
            skillLvl: playerSport.skillLvl,
            sportid: playerSport.sportid
        })
        .complete(function(error, doc){
            util.methods.onCompleteCreate(error, doc, tags, promise, 'playerSport ' + playerSport.id + ' added to db');
        });
        return promise.promise;
    },

    deletePlayerSport: function(playerid){
        var tags = ['PlayerSport.js', 'deletePlayerSport'];
        var promise = q.defer();
        PlayerSport.destroy({
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
    PlayerSport: PlayerSport,
    methods: methods
};