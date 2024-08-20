const express = require('express');
const massesController = require('../controllers/massesController');
const router = express.Router();

router.get('/', massesController.getAllMasses);
router.get('/:id', massesController.getMassById);
router.post('/', massesController.createMass);
router.put('/:id', massesController.updateMass);

module.exports = router;