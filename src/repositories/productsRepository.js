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
  });
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
  });
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
    const state = 1;

    /// Se crea el producto "manualmente"
    errorMessage = 'crear el producto';

    const currentProduct = await models.Product.create({
      idDatasheet,
      idCategorie,
      name,
      stock,
      price,
      image,
      state
    });

    return await findProductById(currentProduct.id);

  } catch (error) {
    await transaction.rollback();
    console.log(`Error al ${errorMessage}`, error);
    return { success: false, error };
  }
};

const updateProduct = async (id, data) => {

  // se define el producto en cuestion a actualizar
  const product = await findProductById(id);

  if (
    product.name != data.name &&
    product.stock != data.stock &&
    product.price != data.price &&
    product.state != data.stateA 
  ) {

    try {
      // en este caso solo se tiene que actualizar la tabla "products"

      //---// Se definen las variables con las que se actualizara la tabla products

      const name = data.name
      const stock = data.stock
      const price = data.price

      const product = await models.Product.update({
        name,
        stock,
        price
      })

      return { success: true, product };

    } catch (error) {
      return { success: false, error }
    }
  } else {
    // en este caso hay un cambio en la ficha, por lo que se crea y se le asigna una nueva

  }

};


module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct
};


/*
{
  "idCategorie": 1,
  "name": "Panzerrotti ranchero",
  "stock": 100,
  "price": "2500",
  "image": "imagen1.jpg",
  "datasheet": {
    "idMass": 1,
    "datasheetDetails": [
      {
        "idSupplie": 14,
        "amount": 0,
        "unit": "lb"
      },
      {
        "idSupplie": 13,
        "amount": 0,
        "unit": "lb"
      },
      {...}
    ]
  }
}
*/

/* 
{
  idCategorie: 1,
  name: 'Panzerrotti de aguacate',
  stock: 100,
  price: '2500',
  image: 'imagen1.jpg',
  datasheet: { idMass: 1, details: [ [Object], [Object] ] }
}
*/