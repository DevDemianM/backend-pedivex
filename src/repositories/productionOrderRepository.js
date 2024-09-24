const sequelize = require('../config/database');
const { models } = require('../models');
const supplies = require('../models/supplies');

const getAllProductionOrder = async () => {
  return await models.ProductionOrder.findAll({
    include: [models.ProductionOrderDetail],
  });
};

const getProductionOrderById = async (id) => {
  return await models.ProductionOrder.findByPk(id, {
    include: [models.ProductionOrderDetail]
  });
};

const createProductionOrder = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { date, notes, idUser, state, targetDate, details } = data;

    // Crea la orden de producción
    const productionOrder = await models.ProductionOrder.create({
      date,
      notes,
      idUser,
      state,
      targetDate
    }, { transaction });

    // Crea los detalles de la orden de producción
    const productionOrderDetails = details.map(detail => ({
      ...detail,
      idProductionOrder: productionOrder.id
    }));
    await models.ProductionOrderDetail.bulkCreate(productionOrderDetails, { transaction });

    // Confirma la transacción
    await transaction.commit();

    return { success: true, productionOrder };
  } catch (error) {
    // Revertir la transacción en caso de error
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error('Error al crear orden de producción y detalles:', error);
    return { success: false, error };
  }
};

const updateProductionOrder = async (id, updatedOrder) => {
  const transaction = await sequelize.transaction(); 

  try {
    // Obtener la orden original
    const existingOrder = await models.ProductionOrder.findByPk(id, {
      include: [{ model: models.ProductionOrderDetail }]
    });

    // Verificación de si hubo un cambio de estado a "En producción"
    if ((existingOrder.state !== updatedOrder.state) && updatedOrder.state === 6) {
      // Obtener los detalles de la orden de producción
      const productionOrderDetails = existingOrder.productionOrderDetails;

      // Actualizar el stock de los productos y restar insumos
      productionOrderDetails.forEach(detail => {
        
      });

    }

    // Actualizar la orden de producción con los nuevos datos
    await models.ProductionOrder.update(updatedOrder, {
      where: { id },
      transaction
    });

    // Confirmar la transacción
    await transaction.commit();

    return { message: 'Orden actualizada correctamente y stock ajustado' };
  } catch (error) {
    // Hacer rollback en caso de error
    await transaction.rollback();
    throw new Error(`Error al actualizar la orden: ${error.message}`);
  }
};



const deleteProductionOrder = async (id) => {
  return await models.ProductionOrder.destroy({
    where: { id }
  });
};

module.exports = {
  getAllProductionOrder,
  getProductionOrderById,
  createProductionOrder,
  updateProductionOrder,
  deleteProductionOrder
};