var Sequelize = require('sequelize');
var q = require('q');
var lodash = require('lodash');
var util = require('../utilities');
var connection = null;

var logger = require('../../../util/Logger');

var Player = {};
var Sports = {};

var playerSports = require('./PlayerSports');
var playerRating = require('./PlayerRating');


var init = {
    loadModel: function(dbConnection, loadSubTables){
        connection = dbConnection;

        Player = connection.define('Player', 
        {
            // Player details
            id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            username: { type: Sequelize.STRING, allowNull: false },
            password: { type: Sequelize.STRING, allowNull: false },
            firstname: { type: Sequelize.STRING, allowNull: false },
            lastname: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false }

        },
        {
            tableName: 'Player', // this will define the table's name
        });

        if(loadSubTables){
            PlayerSports.init.loadModel(dbConnection);
            PlayerSports = playerSports.PlayerSports;

            PlayerRating.init.loadModel(dbConnection);
            PlayerRating = playerRating.PlayerRating;

        }

    }
};

var mainMethods = {
    searchById: function(id){
        var tags = ['Player.js', 'searchById'];
        var promise = q.defer();
        PlayerRating.find({
            where: {
                id: id
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Could not find Player');
        });
        return promise.promise;
    },
    searchByUsername: function(username){
        var tags = ['PlayerRating.js', 'searchByUsername'];
        var promise = q.defer();
        PlayerRating.find({
            where: {
                username: username
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Could not find player');
        });
        return promise.promise;
    },

    searchByEmail: function(email){
        var tags = ['PlayerRating.js', 'searchByEmail'];
        var promise = q.defer();
        PlayerRating.find({
            where: {
                email: email
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Could not find player');
        });
        return promise.promise;
    },


    updatePlayer: function(username, newPlayer){
        var tags = ['player.js', 'updatePlayer'];
        var promise = q.defer();
        Player.update(newPlayer, {
            where: { username: username }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Could not find Player');
        });
        return promise.promise;
    },
    // offer audit trail

    createPlayer: function(playerJson){
        var tags = ['Player.js', 'createPlayer'];
        var promise = q.defer();
        Player.create({
            username: playerJson.username,
            password: playerJson.password,
            firstname: playerJson.firstname,
            lastname: playerJson.lastname,
            email: playerJson.email
        })
        .complete(function(error, offer){
            util.methods.onCompleteCreate(error, offer, tags, promise, 'Player ' + playerJson.usernameId + ' added to the database');
        });
        return promise.promise;
    },


    deletePlayer: function(username){
        var tags = ['deletePlayer.js', 'deletePlayer'];
        var promise = q.defer();
        Player.destroy({
            where: {
                username: username
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Could not find Player');
        });
        return promise.promise;
    }
};

var methods = {
    main: mainMethods,
    rating: PlayerRating.methods || {},
    sport : PlayerSport.methods || {},
};

module.exports = {
    init: init,
    Player: Player,
    methods: methods
};