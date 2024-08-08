const express = require('express');
const saleController = require('../controllers/saleController');
const { saleValidationRules, validate } = require('../middlewares/saleValidation');

const router = express.Router();

// Define tus rutas
router.post('/sales', saleValidationRules(), validate, saleController.createSale);
router.get('/sales/:id', saleController.getSaleById);
router.get('/sales', saleController.getAllSales);
router.put('/sales/:id', saleValidationRules(), validate, saleController.updateSale);
router.delete('/sales/:id', saleController.deleteSale);

// Exportar el router
module.exports = router;
