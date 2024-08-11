// src/routes/employeeRoutes.js

const express = require('express');
const employeeController = require('../controllers/employeeController');
const { employeeValidationRules, validate } = require('../middlewares/employeeValidation');

const router = express.Router();

// Define tus rutas
router.post('/', employeeValidationRules(), validate, employeeController.registerEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.get('/', employeeController.getAllEmployees);
router.put('/:id', employeeValidationRules(), validate, employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

// Exportar el router
module.exports = router;
