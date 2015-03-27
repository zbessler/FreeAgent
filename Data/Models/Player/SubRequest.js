var Sequelize = require('sequelize');
var q = require('q');
var connection = null;
var lodash = require('lodash');
var util = require('../utilities');
var logger = require('../../../Utils/Logger');

var SubRequest = null;


var init = {
    loadModel: function(dbConnection){
        connection = dbConnection;

        SubRequest = connection.define('SubRequest', 
        {
            id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            playerid: { type: Sequelize.INTEGER, allowNull: false },
            gameid: { type: Sequelize.INTEGER, allowNull: false },
            accepted: { type: Sequelize.BOOLEAN, allowNull: true },
            void: { type: Sequelize.BOOLEAN, allowNull: true }
        },
        {
            tableName: 'SubRequest', // this will define the table's name
        });
    }
};

var methods = {
    searchByPlayerid: function(playerid){
        var tags = ['SubRequest.js', 'searchByPlayerid'];
        var promise;
        promise = q.defer();
        SubRequest.find({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            util.methods.onComplete(error, doc, tags, promise, 'Could not find SubRequest');
        });
        return promise.promise;
    },
    searchByGameid: function(gameid){
        var tags = ['SubRequest.js', 'searchByGameid'];
        var promise = q.defer();
        SubRequest.findAll({
            where: {
                gameid: gameid
            }
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find SubRequest');
        });
        return promise.promise;
    },

    search: function(SubRequest) {
        var tags = ['SubRequest.js', 'search'];
        var promise = q.defer();
        SubRequest.findAll({
            where: SubRequest
        }).complete(function(error, doc){
            util.methods.onCompleteAll(error, doc, tags, promise, 'Could not find SubRequest');
        });
        return promise.promise;
    },

    createSubRequest: function(SubRequest){
        var tags = ['SubRequest.js', 'createSubRequest'];
        var promise = q.defer();
        SubRequest.create({
            playerid: SubRequest.playerid,
            skillLvl: SubRequest.skillLvl,
            sportid: SubRequest.sportid
        })
        .complete(function(error, doc){
            util.methods.onCompleteCreate(error, doc, tags, promise, 'SubRequest ' + SubRequest.id + ' added to db');
        });
        return promise.promise;
    },

    deleteSubRequest: function(playerid){
        var tags = ['SubRequest.js', 'deleteSubRequest'];
        var promise = q.defer();
        SubRequest.destroy({
            where: {
                playerid: playerid
            }
        })
        .complete(function(error, doc){
            util.methods.onComplete(error, doc, tags, promise, 'Could not find SubRequest');
        });
        return promise.promise;
    }
};

module.exports = {
    init: init,
    SubRequest: SubRequest,
    methods: methods
};