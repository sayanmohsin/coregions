var express = require('express');
var router = express.Router();

/**
 * controllers
 */
const coregionController = require('../../controllers/coregions.controller');

/** get all coregion */
router.get('/coregions', coregionController.getAllCoregions);

/** get coregion by id */
router.get('/coregions', coregionController.getCoregionById);

/** add new coregion */
router.post('/coregions', coregionController.createCoregions);

/** update coregion */
router.put('/coregions', coregionController.updateCoregion);

/** add new coregion */
router.post('/imports/coregions', coregionController.importNewCoregions);


module.exports = router;
