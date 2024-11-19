const express = require('express');
const router = express.Router();
const SuppliesController = require('../controllers/suppliesController');
const validateSupplies = require('../middlewares/validateSupplies');

router.get('/', SuppliesController.getAllSupplies);
router.get('/:id', SuppliesController.getSuppliesById);
router.post('/', validateSupplies, SuppliesController.createSupplies);
router.put('/:id', SuppliesController.updateSupplies);
router.delete('/:id', SuppliesController.deleteSupplies);
router.patch('/:id', SuppliesController.updateSuppliesStock);

module.exports = router;
