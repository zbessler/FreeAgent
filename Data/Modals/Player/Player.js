var Sequelize = require('sequelize');
var q = require('q');
var lodash = require('lodash');
var connection = null;

var logger = require('../../../util/logger');
var offerCategory = require('./OfferCategory');
var offerLocation = require('./OfferLocation');
var offerMedia = require('./OfferMedia');
var util = require('../utilities');

var Offer = {};
var Category = {};
var OfferLocation = {};
var Media = {};


var init = {
    loadModel: function(dbConnection, loadSubTables){
        connection = dbConnection;

        Offer = connection.define('Offer', 
        {
            // Offer details
            offerId: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
            sourceId: { type: Sequelize.STRING, allowNull: false },
            sourceSystemId: { type: Sequelize.INTEGER },
            displayRank: { type: Sequelize.INTEGER },
            fulfillmentType: { type: Sequelize.STRING },
            redemptionType: { type: Sequelize.STRING },
            destinationUrl: { type: Sequelize.STRING },
            lastUpdatedTime: { type: Sequelize.DATE },

            CTAType: { type: Sequelize.STRING },
            couponCode: { type: Sequelize.STRING },
            couponUrl: { type: Sequelize.STRING },

            enrollmentCap: { type: Sequelize.INTEGER },
            remainingEnrollment: { type: Sequelize.INTEGER },

            // Flags
            limited: { type: Sequelize.BOOLEAN },
            shareable: { type: Sequelize.BOOLEAN },
            enabled: { type: Sequelize.BOOLEAN },
            doNotUpdate: { type: Sequelize.BOOLEAN, defaultValue: 0 },

            // Offer Duration
            displayStartDate: { type: Sequelize.DATE },
            displayEndDate: { type: Sequelize.DATE },
            validStartDate: { type: Sequelize.DATE },
            validEndDate: { type: Sequelize.DATE },

            // Summary and Content
            offerName: { type: Sequelize.STRING },
            merchantName: { type: Sequelize.STRING },
            merchantUrl: { type: Sequelize.STRING },
            shortDesc: { type: Sequelize.STRING },
            longDesc: { type: Sequelize.STRING(1000) },
            terms: { type: Sequelize.STRING(4000) }
        },
        {
            tableName: 'Offer', // this will define the table's name
        });

        if(loadSubTables){
            offerCategory.init.loadModel(dbConnection);
            Category = offerCategory.offerCategory;

            offerLocation.init.loadModel(dbConnection);
            OfferLocation = offerLocation.offerLocation;

            offerMedia.init.loadModel(dbConnection);
            Media = offerMedia.offerMedia;
        }

    }
};

var mainMethods = {
    searchByOfferId: function(id){
        var tags = ['Offer.js', 'searchByOfferId'];
        var promise = q.defer();
        Offer.find({
            where: {
                offerId: id
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Couldn\'t find offer');
        });
        return promise.promise;
    },
    searchBySourceId: function(id){
        var tags = ['Offer.js', 'searchBySourceId'];
        var promise = q.defer();
        Offer.find({
            where: {
                sourceId: id
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Couldn\'t find offer');
        });
        return promise.promise;
    },

    getValidOffers: function(count){
        var tags = ['Offer.js', 'getValidOffers'];
        var promise = q.defer();
        var now = new Date();
        Offer.findAll({
            where: {
                displayStartDate: { lt: now },
                displayEndDate: { gt: now },
                validStartDate: { lt: now },
                validEndDate: { gt: now },
                enabled: true,
                sourceSystemId: 4,
                shareable: 1,
                limited: 0
            }
        })
        .complete(function(error, document){
            util.methods.onCompleteAll(error, document, tags, promise, 'Could not find valid offers', count);
        });
        return promise.promise;
    },
    updateOffer: function(offerId, newOffer){
        var tags = ['OfferModels/Offer.js', 'updateOffer'];
        var promise = q.defer();
        Offer.update(newOffer, {
            where: { offerId: offerId }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Couldn\'t find offer');
        });
        return promise.promise;
    },
    // offer audit trail

    createOffer: function(offerJson){
        var tags = ['Offer.js', 'createOffer'];
        var promise = q.defer();
        Offer.create({

            offerId: offerJson.offerId,
            sourceId: offerJson.sourceId,
            sourceSystemId: offerJson.sourceSystemId,
            displayRank: offerJson.displayRank,
            fulfillmentType: offerJson.fulfillmentType,
            redemptionType: offerJson.redemptionType,
            destinationUrl: offerJson.destinationUrl,
            lastUpdatedTime: offerJson.lastUpdatedTime,

            CTAType: offerJson.CTAType,
            couponCode: offerJson.couponCode,
            couponUrl: offerJson.couponUrl,

            enrollmentCap: offerJson.enrollmentCap,
            remainingEnrollment: offerJson.remainingEnrollment,

            // Flags
            limited: offerJson.limited,
            shareable: offerJson.shareable,
            enabled: offerJson.enabled,
            doNotUpdate: offerJson.doNotUpdate,

            // Offer Duration
            displayStartDate: offerJson.displayStartDate,
            displayEndDate: offerJson.displayEndDate,
            validStartDate: offerJson.validStartDate,
            validEndDate: offerJson.validEndDate,

            // Summary and Content
            offerName: offerJson.offerName,
            merchantName: offerJson.merchantName,
            merchantUrl: offerJson.merchantUrl,
            shortDesc: offerJson.shortDesc,
            longDesc: offerJson.longDesc,
            terms: offerJson.terms
        })
        .complete(function(error, offer){
            util.methods.onCompleteCreate(error, offer, tags, promise, 'Offer ' + offerJson.offerId + ' added to the database');
        });
        return promise.promise;
    },


    deleteOffer: function(id){
        var tags = ['OfferModels/Offer.js', 'deleteOffer'];
        var promise = q.defer();
        Offer.destroy({
            where: {
                offerId: id
            }
        })
        .complete(function(error, document){
            util.methods.onComplete(error, document, tags, promise, 'Couldn\'t find offer');
        });
        return promise.promise;
    }
};

var methods = {
    main: mainMethods,
    category: offerCategory.methods || {},
    location : offerLocation.methods || {},
    media : offerMedia.methods || {}
};

module.exports = {
    init: init,
    offer: Offer,
    offerMethods: methods
};