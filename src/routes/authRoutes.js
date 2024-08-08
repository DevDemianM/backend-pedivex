const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/recover-password', authController.recoverPassword);

module.exports = router;
