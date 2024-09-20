const express = require ('express');
const saleDetailController = require ('../controllers/saleDetailsController');
const validateSaleDetail = require ('../middlewares/validateSaleDetail');

const router = express.Router ();
router.get('/', saleDetailController.getAllsaleDetails);
router.post('/;id', saleDetailController.getsaleDetailById);

module.exports = router;