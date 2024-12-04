const productsRepository = require('../repositories/productsRepository');

const getAllProducts = async () => {
  return await productsRepository.findAllProducts();
}

const getProductById = async (id) => {
  return await productsRepository.findProductById(id);
}

const createProduct = async (data) => {
  return await productsRepository.createProduct(data);
}

const updateProduct = async (id, data) => {
  return await productsRepository.updateProduct(id, data);
}

const stateValidation = async (id) => {
  return await productsRepository.stateValidation(id);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  stateValidation
}
