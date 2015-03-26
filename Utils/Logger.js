var config = require('../Configs/config.' + (process.env.NODE_ENV || 'local'));
// var loggly = require('loggly');
// var logger = loggly.createClient(config.log_info);

// private method that does the logging
var log = function(level, msg, tags){
    var data = {};

    if( (typeof msg === 'object') && (msg !== null) ) {
        msg.level = level.txt;
        msg.env = config.env;
        data = msg;
    }else{
        data.level = level.txt;
        data.env = config.env;
        data.message = msg;
    }

    //tags.push(level.txt);
    // if(config.log_level >= level.val){
        // logger.log(data, tags);
    // }
    if(config.console_level >= level.val && level.val >= 2){
        console.log(level.txt + ': ' + msg + ' - Tags: ' + tags);
    }else if(config.console_level >= level.val ){
        console.error(level.txt + ': ' + msg + ' - Tags: ' + tags);
    }
    
};

module.exports = {
    debug: function(msg, tags){
        log({txt: 'DEBUG' ,val: 4}, msg, tags);
    },
    info: function(msg, tags){
        log({txt: 'INFO' ,val: 3}, msg, tags);
    },
    warn: function(msg, tags){
        log({txt: 'WARN' ,val: 2}, msg, tags);
    },
    error: function(msg, tags){
        log({txt: 'ERROR' ,val: 1}, msg, tags);
    }
};