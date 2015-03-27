var dao = require('../Data/DAO');

/*
    
*/
var CreatePlayer = function(playerInfo) {
    return dao.methods.playerMethods.main.createPlayer(playerInfo);
};


module.exports = {
    CreatePlayer: CreatePlayer
};