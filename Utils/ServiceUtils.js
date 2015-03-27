var logger = require('../Utils/Logger');


var CheckParam = function(param, res, thing, tags){
    if(!param){
        logger.ERROR('Sent with no '+thing, tags);
        res.status(500).send('You must submit an '+thing+' with post/get');
        return true;
    }
    return false;
};


module.exports = {
    CheckParam: CheckParam
};