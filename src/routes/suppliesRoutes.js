const express = require('express');
const router = express.Router();
const SuppliesController = require('../controllers/SuppliesController');
const validateSupplies = require('../middlewares/validateSupplies');

router.get('/all', SuppliesController.getAllSupplies);
router.get('/:id', SuppliesController.getSuppliesById);
router.post('/', validateSupplies, SuppliesController.createSupplies);
router.put('/:id', validateSupplies, SuppliesController.updateSupplies);
router.delete('/:id', SuppliesController.deleteSupplies);

module.exports = router;
