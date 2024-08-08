
const express = require('express');
const orderDetailController = require('../controllers/orderDetailController');
const validateOrderDetail = require('../middlewares/validateOrderDetail');

const router = express.Router();

router.get('/', orderDetailController.getAllOrderDetail);
router.get('/:id', orderDetailController.getOrderDetailById);
router.post('/', validateOrderDetail, orderDetailController.createOrderDetail);
router.put('/:id', validateOrderDetail, orderDetailController.updateOrderDetail);
router.delete('/:id', orderDetailController.deleteOrderDetail);

module.exports = router;
    