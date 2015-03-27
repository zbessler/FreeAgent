var Sequelize = require('sequelize');
var q = require('q');
var connection = null;
var lodash = require('lodash');
var util = require('../utilities');
var logger = require('../../../Utils/Logger');

var SubHistory = null;


var init = {
    loadModel: function(dbConnection){
        connection = dbConnection;

        SubHistory = connection.define('SubHistory', 
        {
            id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            playerid: { type: Sequelize.INTEGER, allowNull: false },
            teamid: { type: Sequelize.INTEGER, allowNull: false },
            ratingid: { type: Sequelize.INTEGER, allowNull: false },
            gameid: { type: Sequelize.INTEGER, allowNull: false }
        },
        {
            tableName: 'SubHistory', // this will define the table's name
        });
    }
};

var methods = {
    searchByPlayerid: function(playerid){
        var tags = ['SubHistory.js', 'searchByPlayerid'];
        var promise;
        promise = q.defer();
        SubHistory.find({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            util.methods.onComplete(error, doc, tags, promise, 'Could not find History');
        });
        return promise.promise;
    },
    searchBySportid: function(sportid){
        var tags = ['SubHistory.js', 'searchBySportid'];
        var promise = q.defer();
        SubHistory.findAll({
            where: {
                sportid: sportid
            }
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find History');
        });
        return promise.promise;
    },
    searchByRatingid: function(ratingid){
        var tags = ['SubHistory.js', 'searchByRatingid'];
        var promise = q.defer();
        SubHistory.findAll({
            where: {
                ratingid: ratingid
            }
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find History');
        });
        return promise.promise;
    },

    search: function(SubHistory) {
        var tags = ['SubHistory.js', 'search'];
        var promise = q.defer();
        SubHistory.findAll({
            where: SubHistory
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find History');
        });
        return promise.promise;
    },

    createSubHistory: function(SubHistory){
        var tags = ['SubHistory.js', 'createSubHistory'];
        var promise = q.defer();
        SubHistory.create({
            playerid: SubHistory.playerid,
            skillLvl: SubHistory.skillLvl,
            sportid: SubHistory.sportid
        })
        .complete(function(error, doc){
            util.methods.onCompleteCreate(error, doc, tags, promise, 'SubHistory ' + SubHistory.id + ' added to db');
        });
        return promise.promise;
    },

    deleteSubHistory: function(playerid){
        var tags = ['SubHistory.js', 'deleteSubHistory'];
        var promise = q.defer();
        SubHistory.destroy({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            util.methods.onComplete(error, doc, tags, promise, 'Could not find History');
        });
        return promise.promise;
    }
};

module.exports = {
    init: init,
    SubHistory: SubHistory,
    methods: methods
};