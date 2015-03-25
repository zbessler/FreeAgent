var config = require('../config/config.' + (process.env.NODE_ENV || 'local'));

var q = require('q');
var Sequelize = require('sequelize');
var connection = null;
var migrations = null;

var logger = require('../util/logger');

// Models to user
var User = null;
var Offer = null;

var daoMethods = {};

var ConnectionDeferred = q.defer();




var init = {
    /**
        Connect to the management db

        @param dbMigrations: Config object to specify how migrations should be handled
    **/
    connectAndStart : function(dbMigrations) {
        connection = new Sequelize(config.management_db.database_name, config.management_db.username, config.management_db.password, {
            dialect: config.management_db.dialect,
            port:    config.management_db.port
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
            console.log('Unable to connect to the database: ', error);
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
        var tags = ['ManagementDAO.js', 'loadModels'];
        if(!connection){
            logger.warn('Could not connect to the DB', tags);
            // Throw warning, probably want to force developer to explicitally connect instead of connecting automatically
        }else{

            var Event = require('./models/EventModels/Event');
            Event.init.loadModel(connection);
            daoMethods.eventMethods = Event.eventMethods;       

            var FBAction = require('./models/Analytics/FacebookAction');
            FBAction.init.loadModel(connection);
            daoMethods.facebookActionMethods = FBAction.facebookActionMethods;

            var FBActionType = require('./models/Analytics/FacebookActionType');
            FBActionType.init.loadModel(connection);  

            var OfferImpressions = require('./models/Analytics/OfferImpressions');
            OfferImpressions.init.loadModel(connection);
            daoMethods.offerImpressionMethods = OfferImpressions.offerImpressionMethods;

            var UserAction = require('./models/Analytics/UserAction');
            UserAction.init.loadModel(connection);
            daoMethods.userActionMethods = UserAction.userActionMethods;

            var UserActionType = require('./models/Analytics/UserActionType');
            UserActionType.init.loadModel(connection);

            var Visit = require('./models/Analytics/Visit');
            Visit.init.loadModel(connection);
            daoMethods.visitMethods = Visit.visitMethods;              

        }
    },

    /**
        Sync any migrations needed

        @param forceDropTables: True will drop the tables before it creates them, false will just create the table if it doesn't exist
        @param callback         Callback function to execute after the migration sync has taken place. Can be used to add new records, or update existing ones
    **/
    syncMigrations: function(forceDropTables, callback){
        var tags = ['ManagementDAO.js', 'syncMigrations'];
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