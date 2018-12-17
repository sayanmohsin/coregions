var express = require('express');
var router = express.Router();

/**
 * controllers
 */
const coregionController = require('../../controllers/coregions.controller');

/** get all coregion */
router.get('/', coregionController.getAllCoregions);

/** get coregion by id */
router.get('/', coregionController.getCoregionById);

/** add new coregion */
// router.post('/', coregionController.createCoregions);

/** update coregion */
// router.put('/', coregionController.updateCoregion);


module.exports = router;
