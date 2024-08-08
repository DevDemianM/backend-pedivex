const productCategories = require('../models/productCategories')

const findAllProductCategories = async () => {
  return await productCategories.findAll();
}

const findProductCategoryById = async (id) => {
  return await productCategories.findByPk(id);
}

const createProductCategory = async (data) => {
  return await productCategories.create(data);
}

const updateProductCategory = async (id, data) => {
  const productCategorie = await productCategories.findByPk(id);
  if (!productCategorie) return null;
  return productCategorie.update(data);
}

const deleteProductCategory = async (id) => {
  const productCategorie = await productCategories.findByPk(id);
  if (!productCategorie) return null;
  return productCategorie.destroy();
}

module.exports = {
  findAllProductCategories,
  findProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
}