// Requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var moment = require('moment');

var data = require('./NodeServices/Data');
var search = require('./NodeServices/Search');


var databaseMigrations = {
    sync: process.env.SYNC, // Specify whether to sync the database with the current models
    force: process.env.FORCE, // Specifies whether to drop the tables before creating them
    callback: function(err) { // a call back function to to run if you sync
        if (!!err) {
            logger.ERROR(err);
        } 
    }
};


app.use(bodyParser());
app.use(cookieParser());

// Mount the routes to their appropriate location
var routeMe = function(location, service){
    var Router = express.Router('/');
    service.init.routes(Router);
    app.use('/'+location, Router);
};

app.use(express.static('public'));
//app.use("/content", express.static(__dirname + "/views/content/"));
app.use("/bower_components/", express.static(__dirname + "/bower_components/"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/templates", express.static(__dirname + "/views/templates/"));
app.use("/partials", express.static(__dirname + "/views/partials/"));
app.use("/modals", express.static(__dirname + "/views/modals/"));
app.use("/", express.static(__dirname + '/'));

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'We\'re sorry, but the system is experiencing some technical difficulties. Please wait and try again.');
});

var server = app.listen(process.env.PORT || 3000, function() {
    //logger.INFO('Listening on port ' + server.address().port, ['inreach_server.js', '#coolservers']);
    var p = data.players[1];
    search.searchPlayer(p.sport, p.location, moment(), p.position, p.leagueLvl);
});
