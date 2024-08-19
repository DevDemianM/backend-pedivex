const express = require('express');
const saleController = require('../controllers/saleController');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', validateSale, saleController.createSale);
router.put('/:id', validateSale, saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;