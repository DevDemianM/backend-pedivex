const express = require('express');
const clientController = require('../controllers/clientController');
const { clientValidationRules, validate } = require('../middlewares/clientValidation');

const router = express.Router();

router.post('/', clientValidationRules(), validate, clientController.registerClient);
router.get('/:id', clientController.getClientById);
router.get('/', clientController.getAllClients);
router.put('/:id', clientValidationRules(), validate, clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router; 