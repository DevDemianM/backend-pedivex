const productCategoriesRespository = require('../repositories/productCategoriesRespository');

const getAllProductCategories = async () => {
  return await productCategoriesRespository.findAllProductCategories();
}

const getProductCategorieById = async (id) => {
  return await productCategoriesRespository.findProductCategoryById(id);
}

const createProductCategorie = async (data) => {
  return await productCategoriesRespository.createProductCategory(data);
}

const updateProductCategorie = async (id, data) => {
  return await productCategoriesRespository.updateProductCategory(id, data);
}

const deleteProductCategorie = async (id) => {
  return await productCategoriesRespository.deleteProductCategory(id);
}

module.exports = {
  getAllProductCategories,
  getProductCategorieById,
  createProductCategorie,
  updateProductCategorie,
  deleteProductCategorie
}