const { models } = require('../models/')

const findAllProductCategories = async () => {
  return await models.ProductCategory.findAll();
}

const findProductCategoryById = async (id) => {
  return await models.ProductCategory.findByPk(id);
}

const createProductCategory = async (data) => {
  return await models.ProductCategory.create(data);
}

const updateProductCategory = async (id, data) => {
  const productCategorie = await models.ProductCategory.findByPk(id);
  if (!productCategorie) return null;
  return productCategorie.update(data);
}

const deleteProductCategory = async (id) => {
  const productCategorie = await models.ProductCategory.findByPk(id);
  if (!productCategorie) return null;
  return productCategorie.destroy();
}

const hasProducts = async (idCategorie) => {
  const products = await models.Product.findAll({ where: { idCategorie } });
  return products;
}

module.exports = {
  findAllProductCategories,
  findProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  hasProducts
}