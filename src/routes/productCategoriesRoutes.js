const express = require('express');
const router = express.Router();
const productCategoriesController = require('../controllers/productCategoriesControllers');

router.get('/', productCategoriesController.getAllProductCategories);
router.get('/:id', productCategoriesController.getProductCategorieById);
router.get('/:id/hasProduct', productCategoriesController.hasProducts);
router.post('/', productCategoriesController.createProductCategorie);
router.put('/:id', productCategoriesController.updateProductCategorie);
router.delete('/:id', productCategoriesController.deleteProductCategorie);

module.exports = router;