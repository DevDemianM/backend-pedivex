const express = require('express');
const router = express.Router();
const SuppliesController = require('../controllers/SuppliesController');
const validateSupplies = require('../middlewares/validateSupplies');


console.log(SuppliesController); // Agrega esto para verificar qué funciones están importadas

router.get('/all', SuppliesController.getAllSupplies);
router.get('/:id', SuppliesController.getSuppliesById);
router.post('/', validateSupplies, SuppliesController.createSupplies);
router.put('/:id', validateSupplies, SuppliesController.updateSupplies);
router.delete('/:id', SuppliesController.deleteSupplies);

module.exports = router;
