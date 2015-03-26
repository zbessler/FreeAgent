var config = require('../config/config.' + (process.env.NODE_ENV || 'local'));

var q = require('q');
var Sequelize = require('sequelize');
var connection = null;
var migrations = null;

var logger = require('../util/Logger');

// Models to user
var Player = null;

var daoMethods = {};

var ConnectionDeferred = q.defer();




var init = {
    /**
        Connect to the management db

        @param dbMigrations: Config object to specify how migrations should be handled
    **/
    connectAndStart : function(dbMigrations) {
        connection = new Sequelize(config.database.database_name, config.database.username, config.database.password, {
            dialect: config.database.dialect,
            port:    config.database.port
        });

        migrations = dbMigrations;
        connection.authenticate().complete(private_methods.handleCompleteConnection);
    }
};

var private_methods = {
    /** 
        Handles when a connection is completed

        @param migrations: Config object to specify how migrations should be handled
    **/
    handleCompleteConnection: function(error){
        if (error) {
            // TODO: log this error
            logger.error('Unable to connect to the database: ', error);
            ConnectionDeferred.reject(error);
        } 
        else {
            private_methods.loadModels();
            if(migrations.sync){
                private_methods.syncMigrations(migrations.force, migrations.callback);
            }
            ConnectionDeferred.resolve(true);
        }
    },

    /**
        Load the database models
    **/
    loadModels: function(){
        var tags = ['DAO.js', 'loadModels'];
        if(!connection){
            logger.warn('Could not connect to the DB', tags);
            // Throw warning, probably want to force developer to explicitally connect instead of connecting automatically
        }else{

            var Player = require('./Models/Player/Player');
            Player.init.loadModel(connection);
            daoMethods.playerMethods = Player.methods;       

        }
    },

    /**
        Sync any migrations needed

        @param forceDropTables: True will drop the tables before it creates them, false will just create the table if it doesn't exist
        @param callback         Callback function to execute after the migration sync has taken place. Can be used to add new records, or update existing ones
    **/
    syncMigrations: function(forceDropTables, callback){
        var tags = ['DAO.js', 'syncMigrations'];
        if(!connection){
            logger.warn('Could not connect to the DB', tags);
            // Throw warning, probably want to force developer to explicitally connect instead of connecting automatically
        }
        else{
            connection.sync({force : forceDropTables}).complete(callback);
        }
    }
};

module.exports = {
    init: init,
    methods: daoMethods,
    connectionPromise: ConnectionDeferred.promise
};