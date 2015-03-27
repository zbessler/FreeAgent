var Sequelize = require('sequelize');
var q = require('q');
var lodash = require('lodash');
var util = require('../utilities');
var connection = null;

var logger = require('../../../Utils/Logger');

var Player = {};
var Sports = {};
var Ratings = {};
var SubRequest = {};
var SubHistory = {};

var subRequest = require('./SubRequest');
var subHistory = require('./SubHistory');
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
            email: { type: Sequelize.STRING, allowNull: false },   // TODO: this is not secure, this MUST BE CHANGED
            sunday: {type: Sequelize.BOOLEAN, allowNull: false },
            monday: {type: Sequelize.BOOLEAN, allowNull: false },
            tuesday: {type: Sequelize.BOOLEAN, allowNull: false },
            wednesday: {type: Sequelize.BOOLEAN, allowNull: false },
            thursday: {type: Sequelize.BOOLEAN, allowNull: false },
            friday: {type: Sequelize.BOOLEAN, allowNull: false },
            saturday: {type: Sequelize.BOOLEAN, allowNull: false },

        },
        {
            tableName: 'Player', // this will define the table's name
        });

        if(loadSubTables){
            playerSports.init.loadModel(dbConnection);
            Sports = playerSports.PlayerSports;

            playerRating.init.loadModel(dbConnection);
            Ratings = playerRating.PlayerRating;

            subRequest.init.loadModel(dbConnection);
            SubRequest = subRequest.SubRequest;

            subHistory.init.loadModel(dbConnection);
            SubHistory = subHistory.SubHistory;
        }

    }
};

var mainMethods = {
    searchById: function(id){
        var tags = ['Player.js', 'searchById'];
        var promise = q.defer();
        Player.find({
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
        Player.find({
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
        Player.find({
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
    rating: Ratings.methods || {},
    sport : Sports.methods || {},
};

module.exports = {
    init: init,
    Player: Player,
    methods: methods
};