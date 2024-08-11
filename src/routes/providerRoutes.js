const express = require('express');
const providerController = require('../controllers/providersController');
const validateProvider = require('../middlewares/validateProvider');

const router = express.Router();

router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProviderById);
router.post('/',  validateProvider,  providerController.createProvider);
router.put('/:id', validateProvider,  providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);

module.exports = router;