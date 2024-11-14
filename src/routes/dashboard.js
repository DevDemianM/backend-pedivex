const express = require('express');
const dashboard = require('../controllers/dashboard');

const router = express.Router();

router.get('/topCinco', dashboard.topCinco);
router.get('/topAnual', dashboard.topAnual);
router.get('/ventasPorMes', dashboard.ventasPorMes);

module.exports = router;