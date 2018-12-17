var Promise = require("bluebird");
var path = require('path');
var _ = require('lodash');

/** resources */
var defaultDataPath = '../resources/coregions.json';

/** models */
const Coregions = require('../models/Coregions');


var bulkImportData = async (datas) => {
    try{
        var newCoregions = [];
        var tempNewCoregions = [];
        var temparray = [];
        var chunk = 10;
        if(datas.length > 20){
            chunk = 20;
        }
        for (let i=0, j=datas.length; i<j; i+=chunk) {
            temparray = datas.slice(i,i+chunk);
            tempNewCoregions = await Coregions.create(temparray);
            newCoregions = _.unionBy(tempNewCoregions, newCoregions);
        }                                             
        return newCoregions?Promise.resolve({message: `${newCoregions.length} created`, status: true}):Promise.resolve({message: `${newCoregions.length} created`, status: false});
    } catch(err){
        Promise.reject(err);
    }
}

var clearCollection = async () => {
    try {
        Coregions.collection.drop();
        var collectionCount = await Coregions.countDocuments();
        return collectionCount == 0 ? 
        Promise.resolve({message: 'collection cleared', status: true}):Promise.resolve({message: 'collection not cleared', status: false})
    }catch(err){
        Promise.reject(err);
    }
}

var getImportdata = async (_path) => {
    try{
        var data = require(_path);
        return Promise.resolve(data);
    }catch(err){
        return Promise.reject(err);
    }
}

var generateCoregionCollection = async (_path) => {
    try{
        var datas = await getImportdata(_path);
        if(datas.length < 0){
            throw new Error({message: 'No import data found', status: false});
        }else{
            var dbClearence = await clearCollection();
            if(dbClearence.status){
                var dbImport = await bulkImportData(datas);
                return dbImport.status?
                Promise.resolve({message: dbImport.message, status: dbImport.status})
                :Promise.resolve({message: dbImport.message, status: dbImport.status});
            }
        }
    }catch(err){
        return Promise.reject(err);
    }
}

// generateCoregionCollection(defaultDataPath).then(rsp => {
//     console.log('rsp: ', rsp);
// }).catch(err => {
//     console.log('err: ', err);
// })

// getImportdata(defaultDataPath).then(rsp => {
//     console.log('rsp: ', rsp);
// }).catch(err => {
//     console.log('err: ', err);
// })

module.exports = {  
    bulkImportData,
    clearCollection,
    getImportdata,
    generateCoregionCollection
}