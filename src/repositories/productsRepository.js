const { Op, JSON } = require('sequelize');
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
    const state = 5;

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


// const updateProduct = async (id, data) => {

//   console.log('\ndata :', data);
//   console.log('\ndata.datasheet :', data.datasheet);
//   console.log('\ndata.datasheet.details :', data.datasheet.details);

//   const transaction = await sequelize.transaction();

//   try {
//     // Se busca el producto actual por ID
//     const product = await findProductById(id);

//     let updatedProduct = null;

//     // Verificar si se deben actualizar los datos básicos del producto
//     if (product.name !== data.name ||
//       product.stock !== data.stock ||
//       product.price !== data.price ||
//       product.state !== data.state) {

//       updatedProduct = await models.Product.update(id, {
//         name: data.name,
//         stock: data.stock,
//         price: data.price,
//         state: data.state
//       });
//     }
//     // Verificar si hay cambios en la ficha técnica
//     if (data.datasheet) {

//       const toUpdateDatasheet = await datasheetsRepository.getDatasheetById(product.idDatasheet);

//       let currentDatasheet = toUpdateDatasheet.dataValues;

//       console.log('\nFicha que se va a actualizar: ', currentDatasheet);
//       console.log('\nDetalles de la ficha que se va a actualizar: ', currentDatasheet.datasheetDetails);
//       let datasheetDetailIndex = 0;
//       currentDatasheet.datasheetDetails.map(detail => {
//         console.log(`\nDetalle #${datasheetDetailIndex++}: ${detail.dataValues}`);
//       })

//       // Si hay cambios en los detalles de la ficha, se crea una nueva ficha técnica
//       if (JSON.stringify(data.datasheet.details) !== JSON.stringify(currentDatasheet.DatasheetDetails)) {

//         // Se finaliza la ficha técnica actual

//         // await models.Datasheet.update(currentDatasheet.id,
//         //   { endDate: Date.now() },
//         //   { where: { id: currentDatasheet.id }, transaction }
//         // );

//         const oldDatasheet = await datasheetsRepository.updateDatasheet(currentDatasheet.id, {
//           idMass: currentDatasheet.idMass, 
//           startDate: currentDatasheet.startDate, 
//           endDate: Date.now(), 
//           details: currentDatasheet.DatasheetDetails
//         });

//         console.log('\nFicha vieja: ', oldDatasheet);

//         /// Se crea la ficha nueva con los datos de llegada
//         const toCreateDatasheet = {
//           idMass: currentDatasheet.idMass,
//           details: data.datasheet
//         };

//         console.log('\nFicha a crear: ', toCreateDatasheet);
        

//         // Se crea una nueva ficha técnica
//         const newDatasheet = await datasheetsRepository.createDatasheet(toCreateDatasheet);

//         console.log('\nFicha nueva: ', newDatasheet);


//         updateProduct = await models.Product.update( id, {
//           ...data,
//           idDatasheet: newDatasheet.id
//         });

//         console.log('\nProducto actualizado', updateProduct);
        
//       }
//     }

//     await transaction.commit();
//     return { success: true, updatedProduct };

//   } catch (error) {
//     await transaction.rollback();
//     console.error('\nError al actualizar el producto: ', error);
//     return { success: false, error };
//   }
// };


// const updateProduct = async (id, data) => {
//   console.log('\ndata :', data);
//   console.log('\ndata.datasheet :', data.datasheet);
//   console.log('\ndata.datasheet.details :', data.datasheet.details);

//   const transaction = await sequelize.transaction();

//   try {
//     // Buscar el producto actual por ID
//     const product = await findProductById(id);

//     // Verificar si se deben actualizar los datos básicos del producto
//     if (product.name !== data.name ||
//         product.stock !== data.stock ||
//         product.price !== data.price ||
//         product.state !== data.state) {

//       await models.Product.update(
//         {
//           name: data.name,
//           stock: data.stock,
//           price: data.price,
//           state: data.state
//         },
//         { where: { id }, transaction }
//       );
//     }

//     // Verificar si hay cambios en la ficha técnica
//     if (data.datasheet) {
//       const currentDatasheet = await datasheetsRepository.getDatasheetById(product.idDatasheet);
      
//       // Comparar los detalles de la ficha técnica
//       if (data.datasheet.details != currentDatasheet.DatasheetDetails) {

//         // Finalizar la ficha técnica actual
//         await datasheetsRepository.updateDatasheet(
//           currentDatasheet.id, 
//           {
//             idMass: currentDatasheet.idMass,
//             startDate: currentDatasheet.startDate,
//             endDate: Date.now(),
//             details: currentDatasheet.datasheetDetails
//           },
//           { transaction }
//         );

//         // Crear una nueva ficha técnica
//         const newDatasheet = await datasheetsRepository.createDatasheet(
//           {
//             idMass: currentDatasheet.idMass,
//             details: data.datasheet.details
//           },
//           { transaction }
//         );

//         // Actualizar el producto con la nueva ficha técnica
//         await models.Product.update(
//           { idDatasheet: newDatasheet.id },
//           { where: { id }, transaction }
//         );
//       }
//     }

//     await transaction.commit();
//     return { success: true };

//   } catch (error) {
//     await transaction.rollback();
//     console.error('\nError al actualizar el producto: ', error);
//     return { success: false, error };
//   }
// };


const updateProduct = async (id, data) => {
  console.log('\ndata :', data);
  console.log('\ndata.datasheet :', data.datasheet);
  console.log('\ndata.datasheet.details :', data.datasheet.details);

  const transaction = await sequelize.transaction();

  try {
    // Buscar el producto actual por ID
    const product = await findProductById(id);

    // Verificar si se deben actualizar los datos básicos del producto
    if (product.name !== data.name ||
        product.stock !== data.stock ||
        product.price !== data.price ||
        product.state !== data.state) {

      await models.Product.update(
        {
          name: data.name,
          stock: data.stock,
          price: data.price,
          state: data.state
        },
        { where: { id }, transaction }
      );
    }

    // Verificar si hay cambios en la ficha técnica
    if (data.datasheet) {
      const currentDatasheet = await datasheetsRepository.getDatasheetById(product.idDatasheet);
      
      // Comparar los detalles de la ficha técnica
      const currentDetails = currentDatasheet.DatasheetDetails.map(detail => ({
        idSupplie: detail.idSupplie,
        amount: detail.amount,
        unit: detail.unit
      }));

      const newDetails = data.datasheet.details.map(detail => ({
        idSupplie: detail.idSupplie,
        amount: detail.amount,
        unit: detail.unit
      }));

      // Si los detalles son diferentes, actualizamos la ficha técnica
      if (JSON.stringify(currentDetails) !== JSON.stringify(newDetails)) {
        // Finalizar la ficha técnica actual
        await datasheetsRepository.updateDatasheet(
          currentDatasheet.id, 
          {
            idMass: currentDatasheet.idMass,
            startDate: currentDatasheet.startDate,
            endDate: new Date(), // Usar Date.now() para finalizar la ficha técnica actual
            details: currentDetails
          },
          { transaction }
        );

        // Crear una nueva ficha técnica
        const newDatasheet = await datasheetsRepository.createDatasheet(
          {
            idMass: data.datasheet.idMass || currentDatasheet.idMass,
            details: newDetails
          },
          { transaction }
        );

        // Actualizar el producto con la nueva ficha técnica
        await models.Product.update(
          { idDatasheet: newDatasheet.id },
          { where: { id }, transaction }
        );
      }
    }

    await transaction.commit();
    return { success: true };

  } catch (error) {
    await transaction.rollback();
    console.error('\nError al actualizar el producto: ', error);
    return { success: false, error };
  }
};


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