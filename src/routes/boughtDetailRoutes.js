const express = require('express');
const boughtDetailController = require('../controllers/boughtDetailsController');
const validateBoughtDetail = require('../middlewares/validateBoughtDetail');

const router = express.Router();

router.get('/', boughtDetailController.getAllBoughtDetails);
router.get('/:id', boughtDetailController.getBoughtDetailById);
router.post('/',  validateBoughtDetail, boughtDetailController.createBoughtDetail);
router.put('/:id', validateBoughtDetail,  boughtDetailController.updateBoughtDetail);
router.delete('/:id', boughtDetailController.deleteBoughtDetail);

module.exports = router;