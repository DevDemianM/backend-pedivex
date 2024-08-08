const express = require('express');
const router = express.Router();
const productCategoriesController = require('../controllers/productCategoriesControllers');

// Ruta para obtener todas las categorías de productos
router.get('/', productCategoriesController.getAllProductCategories);

// Ruta para obtener una categoría de producto por ID
router.get('/:id', productCategoriesController.getProductCategorieById);

// Ruta para crear una nueva categoría de producto
router.post('/', productCategoriesController.createProductCategorie);

// Ruta para actualizar una categoría de producto existente
router.put('/:id', productCategoriesController.updateProductCategorie);

// Ruta para eliminar una categoría de producto
router.delete('/:id', productCategoriesController.deleteProductCategorie);

module.exports = router;