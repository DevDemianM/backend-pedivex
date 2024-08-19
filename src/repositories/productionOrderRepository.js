const sequelize = require('../config/database');
const { models } = require('../models');

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
    // Revertir la transacción en caso de error
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error('Error al crear orden de producción y detalles:', error);
    return { success: false, error };
  }
};

const updateProductionOrder = async (id, data) => {
  return await models.ProductionOrder.update(data, {
    where: { id }
  });
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
