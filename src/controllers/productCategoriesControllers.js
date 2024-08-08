const { request, response } = require('express');
const productCategoriesServices = require('../services/productCategoriesServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await productCategoriesServices.getAllProductCategories();
    sendResponse(res, productCategories);
  } catch (err) {
    sendError(res, err);
  }
}

const getProductCategorieById = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await productCategoriesServices.getProductCategorieById(id);
    if (productCategory) {
      sendResponse(res, productCategory);
    } else {
      res.status(404).send({ message: 'Product Category not found' });
    }
  } catch (err) {
    sendError(res, err);
  }
}

const createProductCategorie = async (req, res) => {
  try {
    const data = req.body;
    const newProductCategory = await productCategoriesServices.createProductCategorie(data);
    sendResponse(res, newProductCategory, 201);
  } catch (err) {
    sendError(res, err);
  }
}

const updateProductCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProductCategory = await productCategoriesServices.updateProductCategorie(id, data);
    if (updatedProductCategory) {
      sendResponse(res, updatedProductCategory);
    } else {
      res.status(404).send({ message: 'Product Category not found' });
    }
  } catch (err) {
    sendError(res, err);
  }
}

const deleteProductCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productCategoriesServices.deleteProductCategorie(id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'Product Category not found' });
    }
  } catch (err) {
    sendError(res, err);
  }
}

module.exports = {
  getAllProductCategories,
  getProductCategorieById,
  createProductCategorie,
  updateProductCategorie,
  deleteProductCategorie
}
