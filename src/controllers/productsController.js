const productsServices = require('../services/productsServices');
const { sendResponse, sendError } = require('../utils/response');

const getAllProducts = async (req, res) => {
  try {
    const products = await productsServices.getAllProducts();
    sendResponse(res, products);
  } catch (err) {
    sendError(res, err);
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await productsServices.getProductById(req.params.id);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}

const createProduct = async (req, res) => {
  try {
    const product = await productsServices.createProduct(req.body);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = await productsServices.updateProduct(req.params.id, req.body);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await productsServices.deleteProduct(req.params.id);
    sendResponse(res, product);
  } catch (err) {
    sendError(res, err);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
