var lodash = require('lodash');
var logger = require('../../util/logger');

var methods = {

    //Handles errors or resolves promise successfully
    onComplete: function(error, document, tags, promise, notFoundMsg) {
        if(error){
            logger.ERROR(error, tags);                
            promise.reject(error);
        } else if(!document){
            // This happens if there wasnt anything found but there was also no error.
            logger.ERROR(notFoundMsg, tags);
            promise.reject(notFoundMsg);
        }else{
            promise.resolve(document.dataValues);
        }
    },
    //Handles errors or resolves promises for functions that return multiple results
    onCompleteAll: function(error, document, tags, promise, notFoundMsg, count) {
        if(error){
            logger.ERROR(error, tags);
            promise.reject(error);
        }else if(!document){
            // This happens if the wasnt anything found but there was also no error.
            logger.ERROR(notFoundMsg, tags);
            promise.reject(notFoundMsg);
        }else{
            var retval = [];
            lodash.forEach(document, function(o){
                retval.push(o.dataValues);
            });
            if(count) {
                retval = lodash.take(retval, count);
            }
            promise.resolve(retval);
        }
    },
    //handles errors/promise after doing a create function (ie Offer.createOffer)
    onCompleteCreate: function(error, document, tags, promise, infoMsg) {
        if(error) {
            logger.ERROR(error, tags);
            promise.reject(error);
        } else {
            logger.INFO(infoMsg, tags);
            promise.resolve(document);
        }
    }

};

module.exports = {
    methods: methods
};
