
const express = require('express');
const requestController = require('../controllers/requestController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.get('/', requestController.getAllRequest);
router.get('/:id', requestController.getRequestById);
router.post('/', validateRequest, requestController.createRequest);
router.put('/:id', validateRequest, requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;

