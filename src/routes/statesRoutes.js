const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

// Ruta para obtener todas las categorías de productos
router.get('/', statesController.getAllStates);

module.exports = router