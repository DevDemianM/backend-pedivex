const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
// const upload = require('../middlewares/uploads');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', /* upload.single('image'), */ productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.patch('/:id', productsController.stateValidation)

module.exports = router;
