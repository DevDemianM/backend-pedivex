const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

router.get('/', statesController.getAllStates);
router.get('/:id', statesController.getStateById);
router.post('/', statesController.createState);
router.put('/', statesController.updateState);
router.delete('/', statesController.deleteState);

module.exports = router