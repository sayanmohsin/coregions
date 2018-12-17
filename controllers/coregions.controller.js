/** models */
const Coregions = require('../models/Coregions');

/** helpers */
const data = require('../helpers/data.helper');

module.exports.createCoregions = async (req, res) => {
    const coregions = new Coregions(req.body);
    try{
        let newCoregions = await coregions.save();
        newCoregions ? res.send(newCoregions) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.getAllCoregions = async (req, res) => {
    let coregions = await Coregions.find(req.query);
    coregions ? res.send(coregions) : res.sendStatus(404);
};

module.exports.getCoregionById = async (req, res) => {
    try{
        let coregions = await Coregions.findOne({ '_id': req.params.id });
        coregions?res.send(coregions) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.updateCoregion = async (req, res) => {
    try{
        let coregions = await Coregions.findByIdAndUpdate({_id: req.params.id});
        coregions?res.send(coregions) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.importNewCoregions = async (req, res) => {
    var _path = req.body._path.toString();
    try{
        let imports = await data.generateCoregionCollection(_path);
        imports.status?res.send(imports):res.sendStatus(500);
    }catch(err){
        res.send(err);
    }
};