const { Op } = require('sequelize');
const { models } = require('../models');
const sequelize = require('../config/database');
const datasheetsRepository = require('./datasheetsRepository');

const findAllProducts = async () => {
  return await models.Product.findAll({
    include: [
      {
        model: models.ProductCategory
      },
      {
        model: models.Datasheet,
        where: {
          endDate: {
            [Op.is]: null
          }
        },
        include: [
          {
            model: models.DatasheetDetail,
            include: [
              {
                model: models.Supply,
                attributes: ['name']
              }
            ]
          },
          {
            model: models.Mass,
            include: [
              {
                model: models.MassDetail,
                include: [
                  {
                    model: models.Supply,
                    attributes: ['name']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
};

const findProductById = async (id) => {
  return await models.Product.findByPk(id, {
    include: [
      {
        model: models.ProductCategory
      },
      {
        model: models.Datasheet,
        where: {
          endDate: {
            [Op.is]: null
          }
        },
        include: [
          {
            model: models.DatasheetDetail,
            include: [
              {
                model: models.Supply,
                attributes: ['name']
              }
            ]
          },
          {
            model: models.Mass,
            include: [
              {
                model: models.MassDetail,
                include: [
                  {
                    model: models.Supply,
                    attributes: ['name']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
};

const createProduct = async (data) => {
  const transaction = await sequelize.transaction();
  let errorMessage = 'no hacer nada, ni empezo esa mierda';
  try {
    errorMessage = 'deserializar el contenido';

    const {
      idCategorie,
      name,
      stock,
      price,
      image,
      datasheet
    } = data;

    /// Se crea la ficha técnica que se le asociara al nuevo producto
    errorMessage = 'crea la ficha y almacenar en una variable';

    const currentDatasheet = await datasheetsRepository.createDatasheet(datasheet);

    /// Definimos variables "por defecto" de la tabla
    errorMessage = 'definir las variables para insertar en el producto';

    const idDatasheet = await currentDatasheet.datasheet.dataValues.id;
    const state = 5;

    /// Se crea el producto "manualmente"
    errorMessage = 'crear el producto';

    const currentProduct = await models.Product.create({
      idDatasheet,
      idCategorie,
      name,
      stock: stock || 0,
      price,
      image,
      state
    }, { transaction });

    await transaction.commit();
    return { success: true, currentProduct };

  } catch (error) {
    await transaction.rollback();
    console.log(`Error al ${errorMessage}`, error);
    return { success: false, error };
  }
};

const updateProduct = async (id, data) => {
  console.log('\nid: ', id, '\ndata: ', data);

  const transaction = await sequelize.transaction();

  try {
    // * Buscar el producto con eager loading para incluir la ficha técnica
    let product = await findProductById(id);
    product = product.dataValues;
    console.log('\nproduct: ', product);

    // * Buscar la ficha técnica del producto
    let oldDatasheet = await models.Datasheet.findByPk(product.idDatasheet, { transaction });
    oldDatasheet = oldDatasheet.dataValues;
    console.log('\nold datasheet: ', oldDatasheet);

    // * Cerrar la antigua ficha técnica
    const closedDatasheets = await models.Datasheet.update({
      endDate: Date.now()
    }, {
      where: { id: product.idDatasheet },
      transaction
    });
    console.log('\nclosed datasheet: ', closedDatasheets);

    // * Crear la nueva ficha técnica
    const newDatasheet = await datasheetsRepository.createDatasheet({
      idMass: oldDatasheet.idMass,
      details: data.datasheet.details
    }, { transaction });
    console.log('\nnew datasheet: ', newDatasheet);

    // * Actualizar el producto
    const updatedProduct = await models.Product.update({
      idCategorie: product.idCategorie,
      idDatasheet: newDatasheet.datasheet.id,
      name: data.name,
      stock: data.stock,
      price: data.price,
      state: data.state
    }, {
      where: { id: product.id },
      transaction
    });
    console.log('\nupdated product: ', updatedProduct);

    const productUpdated = await findProductById(id);

    await transaction.commit();
    return { success: true, productUpdated };
  } catch (error) {
    await transaction.rollback();
    console.error('\nError al actualizar el producto: ', error);
    return { success: false, error };
  }
};

const stateValidation = async (id) => {  
  const currentProduct = await models.Product.findByPk(id);
  const productStock = currentProduct.dataValues.stock;
  const productState = currentProduct.dataValues.state;

  // validar stock y estado del producto
  try {
    if (productStock > 30) {
      if (productState != 10) {
        await models.Product.update({ state: 10 }, {where: id})
      }
    } else if (productStock < 30) {
      if (productState != 11) {
        await models.Product.update({ state: 11 }, {where: id})
      }
    } else if (productStock == 0) {
      if (productState != 5) {
        await models.Product.update({ state: 5 }, {where: id})
      }
    }
    const updatedProduct = await findProductById(id);
    return { success: true, updatedProduct }
  } catch (error) {
    return { success: false, error }
  }
}

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  stateValidation
};