
const express = require('express');
const requestDetailController = require('../controllers/requestDetailController');
const validateRequestDetail = require('../middlewares/validateRequestDetail');

const router = express.Router();

router.get('/', requestDetailController.getAllRequestDetail);
router.get('/:id', requestDetailController.getRequestDetailById);
router.post('/', validateRequestDetail, requestDetailController.createRequestDetail);
router.put('/:id', validateRequestDetail, requestDetailController.updateRequestDetail);
router.delete('/:id', requestDetailController.deleteRequestDetail);

module.exports = router;

