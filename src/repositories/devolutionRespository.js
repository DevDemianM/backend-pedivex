const { models } = require('../models');
const sequelize = require('../config/database');

const getAllDevolutions = async () => {
  return await models.Devolution.findAll({
    include: [
      {
        model: models.MotiveDevolution
      },
      {
        model: models.Sale,
        include: [
          {
            model: models.SaleDetail,
            include: [
              {
                model: models.Product,
                attributes: ['name']
              }
            ]
          }
        ]
      }
    ]
  });
}

const cambioDeSabor = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { idSale, idMotive, devolutionDetails } = data;

    // Crear la devolución principal
    const devolution = await models.Devolutions.create({
      idSale,
      date: new Date(),
      state: 1, // Estado "activo"
      idMotive,
    }, { transaction });

    // Crear los detalles de la devolución
    const details = devolutionDetails.map(detail => ({
      idDevolution: devolution.id,
      idProduct: detail.idProduct,
      quantity: detail.quantity,
      idMotive: detail.idMotive,
      changedProduct: detail.changedProduct,
      changedQuantity: detail.changedQuantity,
    }));

    await models.DevolutionDetails.bulkCreate(details, { transaction });

    // Actualizar el stock de los productos
    for (const detail of devolutionDetails) {
      // Incrementar el stock del producto devuelto
      await models.Products.increment('stock', {
        by: detail.quantity,
        where: { id: detail.idProduct },
        transaction,
      });

      if (detail.changedProduct && detail.changedQuantity) {
        // Disminuir el stock del producto cambiado
        await models.Products.decrement('stock', {
          by: detail.changedQuantity,
          where: { id: detail.changedProduct },
          transaction,
        });
      }
    }

    await transaction.commit();

    return { success: true, devolution };
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear Devolución y sus detalles:', error);
    return { success: false, error };
  }
}

module.exports = {
  getAllDevolutions,
  cambioDeSabor,
};




// const cambioDeSabor = async (devolutionData) => {
//   const transaction = await sequelize.transaction();
//   try {
//       const { idSale, productsToReturn, idMotive } = devolutionData;

//       // Crear la devolución principal
//       const devolution = await models.Devolutions.create({
//           idSale,
//           date: new Date(),
//           state: 1, // Estado "activo"
//           idMotive, // Motivo principal de la devolución
//       }, { transaction });


      

//       const validationErrors = [];
//       for (const product of productsToReturn) {
//           // Validar detalles de devolución (si tienes una función de validación específica)
//           const errors = validateDevolutionDetailsSchema(product);
//           if (errors.length > 0) {
//               validationErrors.push({
//                   product,
//                   errors
//               });
//           }
//       }

//       if (validationErrors.length > 0) {
//           // Revertir la transacción en caso de error
//           await transaction.rollback();

//           // Devolver los errores de validación
//           return { success: false, errors: validationErrors };
//       }

//       for (const product of productsToReturn) {
//           // Incrementar el stock del producto devuelto
//           await models.Products.increment('stock', {
//               by: product.returnQuantity,
//               where: { id: product.productId },
//               transaction,
//           });

//           for (const exchangeProduct of product.exchangeProducts) {
//               // Disminuir el stock del producto por el cual se cambió
//               await models.Products.decrement('stock', {
//                   by: exchangeProduct.quantity,
//                   where: { id: exchangeProduct.productId },
//                   transaction,
//               });

//               // Crear el detalle de la devolución con el producto cambiado
//               await models.DevolutionDetails.create({
//                   idSale: devolution.idSale,
//                   idProduct: product.productId,
//                   quantity: product.returnQuantity,
//                   idMotive: product.motiveId,
//                   changedProduct: exchangeProduct.productId,
//                   changedQuantity: exchangeProduct.quantity,
//               }, { transaction });
//           }
//       }

//       // Confirmar la transacción si todo salió bien
//       await transaction.commit();

//       return { success: true, message: 'Devolución y cambios procesados correctamente.', devolution };
//   } catch (error) {
//       // Revertir la transacción en caso de error
//       await transaction.rollback();
//       console.error('Error al procesar la devolución:', error);
//       return { success: false, error };
//   }
// };