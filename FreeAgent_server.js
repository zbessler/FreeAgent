// Requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var moment = require('moment');

var config = require('./Configs/config.' + (process.env.NODE_ENV || 'local'));
var logger = require('./Utils/Logger');
var dao = require('./Data/DAO');

var player = require('./Services/PlayerServices');
var search = require('./Services/Search');


var databaseMigrations = {
    sync: process.env.SYNC, // Specify whether to sync the database with the current models   process.env.SYNC
    force: process.env.FORCE, // Specifies whether to drop the tables before creating them
    callback: function(err) { // a call back function to to run if you sync
        if (!!err) {
            logger.errors(err);
        } 
    }
};
dao.init.connectAndStart(databaseMigrations);


app.use(bodyParser());
app.use(cookieParser());

// Mount the routes to their appropriate location
var MountService = function(location, service) {
    var Router = express.Router('/');
    service.init.routes(Router);
    app.use('/'+location, Router);
};

MountService('player', player);

app.use(express.static('public'));
app.use('/bower_components/', express.static(__dirname + '/Views/bower_components/'));
app.use('/templates', express.static(__dirname + '/Views/templates/'));
app.use('/partials', express.static(__dirname + '/Views/partials/'));
app.use('/modals', express.static(__dirname + '/Views/modals/'));
app.use('/css', express.static(__dirname + '/Views/css'));
app.use('/img', express.static(__dirname + '/Views/img/'));
app.use('/js', express.static(__dirname + '/Views/js'));
app.use('/', express.static(__dirname + '/'));

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'We\'re sorry, but the system is experiencing some technical difficulties. Please wait and try again.');
});

var server = app.listen(config.port || 3000, function() {
    logger.info('Listening on port ' + server.address().port, ['FreeAgent_server.js']);
});
