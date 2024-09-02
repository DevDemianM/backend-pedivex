const { models } = require('../models');
const { sequelize } = require('../config/database');



const getAllDevolutions = async () => {
  return await models.Devolution.findAll({
    include: [models.MotiveDevolution]
  });
}

const cambioDeSabor = async (devolutionData) => {
  const transaction = await sequelize.transaction();
  try {
      const { idSale, productsToReturn, idMotive } = devolutionData;

      // Crear la devolución principal
      const devolution = await models.Devolutions.create({
          idSale,
          date: new Date(),
          state: 1, // Estado "activo"
          idMotive, // Motivo principal de la devolución
      }, { transaction });

      const validationErrors = [];
      for (const product of productsToReturn) {
          // Validar detalles de devolución (si tienes una función de validación específica)
          const errors = validateDevolutionDetailsSchema(product);
          if (errors.length > 0) {
              validationErrors.push({
                  product,
                  errors
              });
          }
      }

      if (validationErrors.length > 0) {
          // Revertir la transacción en caso de error
          await transaction.rollback();

          // Devolver los errores de validación
          return { success: false, errors: validationErrors };
      }

      for (const product of productsToReturn) {
          // Incrementar el stock del producto devuelto
          await models.Products.increment('stock', {
              by: product.returnQuantity,
              where: { id: product.productId },
              transaction,
          });

          for (const exchangeProduct of product.exchangeProducts) {
              // Disminuir el stock del producto por el cual se cambió
              await models.Products.decrement('stock', {
                  by: exchangeProduct.quantity,
                  where: { id: exchangeProduct.productId },
                  transaction,
              });

              // Crear el detalle de la devolución con el producto cambiado
              await models.DevolutionDetails.create({
                  idSale: devolution.idSale,
                  idProduct: product.productId,
                  quantity: product.returnQuantity,
                  idMotive: product.motiveId,
                  changedProduct: exchangeProduct.productId,
                  changedQuantity: exchangeProduct.quantity,
              }, { transaction });
          }
      }

      // Confirmar la transacción si todo salió bien
      await transaction.commit();

      return { success: true, message: 'Devolución y cambios procesados correctamente.', devolution };
  } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      console.error('Error al procesar la devolución:', error);
      return { success: false, error };
  }
};


module.exports = {
  getAllDevolutions,
  cambioDeSabor
};