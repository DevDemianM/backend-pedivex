const express = require('express');
const recoveryController = require('../controllers/recoveryController');
const router = express.Router();

router.post('/requestRecovery', recoveryController.requestPasswordRecovery);
router.post('/validateToken', recoveryController.validateToken);
router.post('/resetPassword', recoveryController.resetPassword);

module.exports = router;
