var logger = require('../Utils/Logger');
var serviceUtils = require('../Utils/ServiceUtils');
var playerController = require('../Controllers/PlayerController');

var FILENAME = 'PlayerServices.js';


var init = {
    setup: function(singleDAO){
    },

    routes: function(router){
        // These routes are mounted to /player
        router.post('/CreatePlayer', CreatePlayer);
    }
};


var CreatePlayer = function (req, res){
    var tags = [FILENAME,'CreatePlayer'];
    var username = req.params.username;
    var password = req.params.password;
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var email = req.params.email;
    var avail = req.params.avail;

    if(serviceUtils.checkParam(username, res, 'username', tags)) return;
    if(serviceUtils.checkParam(password, res, 'password', tags)) return;
    if(serviceUtils.checkParam(firstname, res, 'firstname', tags)) return;
    if(serviceUtils.checkParam(lastname, res, 'lastname', tags)) return;
    if(serviceUtils.checkParam(email, res, 'email', tags)) return;
    if(serviceUtils.checkParam(avail, res, 'avail', tags)) return;

    var retval = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email,
        sunday: avail[0],
        monday: avail[1],
        tuesday: avail[2],
        wednesday: avail[3],
        thursday: avail[4],
        friday: avail[5],
        saturday: avail[6],
    };

    playerController.CreatePlayer(retval);
};



module.exports = {
    init: init,
};