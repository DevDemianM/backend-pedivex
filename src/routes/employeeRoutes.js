// src/routes/employeeRoutes.js

const express = require('express');
const employeeController = require('../controllers/employeeController');
const { employeeValidationRules, validate } = require('../middlewares/employeeValidation');

const router = express.Router();

// Define tus rutas
router.post('/employees', employeeValidationRules(), validate, employeeController.registerEmployee);
router.get('/employees/:id', employeeController.getEmployeeById);
router.get('/employees', employeeController.getAllEmployees);
router.put('/employees/:id', employeeValidationRules(), validate, employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Exportar el router
module.exports = router;
