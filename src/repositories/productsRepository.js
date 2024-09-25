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



// const updateProduct = async (id, data) => {

//   console.log('\nid: ', id, '\ndata: ', data);


//   const transaction = await sequelize.transaction();

//   try {
//     // *Se busca el producto a actualizar
//     let product = await findProductById(id);
//     product = product.dataValues;
//     console.log('\nproduct: ', product);


//     // *Se busca la ficha del producto a actualizar
//     let oldDatasheet = await models.Datasheet.findByPk(product.idDatasheet);
//     oldDatasheet = oldDatasheet.dataValues;
//     console.log('\nold datasheet: ', oldDatasheet);


//     // *Verificar si el cambio es de la información basica y los detalles
//     // if (
//     //   (product.name !== data.name ||
//     //     product.stock !== data.stock ||
//     //     product.price !== data.price ||
//     //     product.state !== data.state) &&
//     //   (JSON.stringify(data.datasheet.details) !==
//     //     JSON.stringify(currentDatasheet.DatasheetDetails))
//     // ) {

//     let logproduct = await findProductById(id);
//     console.log('prod 1', logproduct.dataValues);

//     // *Se cierra la antigua ficha
//     const closedDatasheets = await models.Datasheet.update({
//       idMass: oldDatasheet.idMass,
//       startDate: oldDatasheet.startDate,
//       endDate: Date.now()
//     }, {
//       where: {
//         id: product.idDatasheet
//       }
//     }, { transaction });
//     console.log('\nclosed datasheet: ', closedDatasheets);
    
//     logproduct = await findProductById(id);
//     console.log('prod 2', logproduct);

//     // *Se crea la nueva ficha
//     const newDatasheet = await datasheetsRepository.createDatasheet({
//       idMass: oldDatasheet.idMass,
//       details: data.datasheet.details
//     });
//     console.log('\nnew datasheet: ', newDatasheet);

//     logproduct = await findProductById(id);
//     console.log('prod 3', logproduct);

//     // *Se actualiza la tabla de la info general del producto
//     const updatedProduct = await models.Product.update({
//       idCategorie: product.idCategorie,
//       idDatasheet: newDatasheet.id,
//       name: data.name,
//       stock: data.stock,
//       price: data.price,
//       state: data.state
//     }, {
//       where: {
//         id: product.id
//       }
//     }, { transaction });
//     console.log('\nupdated product: ', updatedProduct);
    
//     logproduct = await findProductById(id);
//     console.log('prod 4', logproduct);

//     return { success: true, msg: 'insano' };



//     // };

//     // // *Verificar si se deben actualizar los datos básicos del producto
//     // if (product.name !== data.name ||
//     //   product.stock !== data.stock ||
//     //   product.price !== data.price ||
//     //   product.state !== data.state) {

//     //   const updatedProduct = await models.Product.update(id, {
//     //     name: data.name,
//     //     stock: data.stock,
//     //     price: data.price,
//     //     state: data.state
//     //   }, { transaction });

//     //   return { success: true, msg: 'producto actualizado', updatedProduct }
//     // };

//     // *Si hay cambios en los detalles de la ficha, se crea una nueva ficha técnica
//     // if (JSON.stringify(data.datasheet.details) !== JSON.stringify(currentDatasheet.DatasheetDetails)) {

//     //   let currentDatasheet = await datasheetsRepository.getDatasheetById(product.idDatasheet);
//     //   currentDatasheet = currentDatasheet.dataValues;

//     //   const oldDatasheet = await datasheetsRepository.updateDatasheet(currentDatasheet.id, {
//     //     idMass: currentDatasheet.idMass,
//     //     startDate: currentDatasheet.startDate,
//     //     endDate: Date.now(),
//     //     details: currentDatasheet.DatasheetDetails
//     //   });

//     //   console.log('\nAntigua ficha: ', oldDatasheet);

//     //   ///* Se crea la ficha nueva con los datos de llegada
//     //   const toCreateDatasheet = {
//     //     idMass: currentDatasheet.idMass,
//     //     details: data.datasheet
//     //   };

//     //   console.log('\nFicha a crear: ', toCreateDatasheet);


//     //   // *Se crea una nueva ficha técnica
//     //   const newDatasheet = await datasheetsRepository.createDatasheet(toCreateDatasheet);

//     //   console.log('\nFicha nueva: ', newDatasheet);


//     //   const updatedProduct = await models.Product.update(id, {
//     //     ...data,
//     //     idDatasheet: newDatasheet.id
//     //   });

//     //   console.log('\nProducto actualizado', updatedProduct);

//     // };
//   } catch (error) {
//     await transaction.rollback();
//     console.error('\nError al actualizar el producto: ', error);
//     return { success: false, error };
//   }
// };


module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct
};


/* 
* @Formato de llegada del producto a actualizar

* @data
  {
    id: 4,
    idDatasheet: 8,
    idCategorie: 1,
    name: 'Panzerroti de todo',
    stock: 0,
    price: '15000',
    image: 'imagen2.jpg',
    state: 1,
    productCategory: { id: 1, name: 'Congelados' },
    datasheet: { details: [ [Array] ] }
  }

* @data.datasheet
  { details: [ [ [Object], [Object], [Object], [Object], [Object] ] ] }

* @data.datasheet.details
  [
    [
      { idSupplie: 11, amount: 45, unit: 'gr' },
      { idSupplie: 12, amount: 67, unit: 'gr' },
      { idSupplie: 3, amount: 98, unit: 'gr' },
      { idSupplie: 2, amount: 32, unit: 'gr' },
      { idSupplie: 15, amount: 32, unit: 'gr' }
    ]
  ]
*/


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