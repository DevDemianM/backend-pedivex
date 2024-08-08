
const express = require('express');
const productionOrderController = require('../controllers/productionOrderController');
const validateProductionOrder = require('../middlewares/validateProductionOrder');

const router = express.Router();

router.get('/', productionOrderController.getAllProductionOrder);
router.get('/:id', productionOrderController.getProductionOrderById);
router.post('/', validateProductionOrder, productionOrderController.createProductionOrder);
router.put('/:id', validateProductionOrder, productionOrderController.updateProductionOrder);
router.delete('/:id', productionOrderController.deleteProductionOrder);

module.exports = router;

