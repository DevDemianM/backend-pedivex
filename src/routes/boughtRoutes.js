const express = require('express');
const boughtController = require('../controllers/boughtsController');
const validateBought = require('../middlewares/validateBought');

const router = express.Router();

router.get('/', boughtController.getAllBoughts);
router.get('/:id', boughtController.getBoughtById);
router.post('/',  validateBought,  boughtController.createBought);
router.put('/:id', validateBought,  boughtController.updateBought);
router.delete('/:id', boughtController.deleteBought);

module.exports = router;