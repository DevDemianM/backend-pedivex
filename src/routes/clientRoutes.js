const express = require('express');
const clientController = require('../controllers/clientController');
const { clientValidationRules, validate } = require('../middlewares/clientValidation');

const router = express.Router();

router.post('/clients', clientValidationRules(), validate, clientController.registerClient);
router.get('/clients/:id', clientController.getClientById);
router.get('/clients', clientController.getAllClients);
router.put('/clients/:id', clientValidationRules(), validate, clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router; 