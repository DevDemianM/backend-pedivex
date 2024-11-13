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


const updateProductionOrder = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    // Obtener la orden de producción existente y sus detalles
    const existingOrder = await models.ProductionOrder.findByPk(id, {
      include: [{ model: models.ProductionOrderDetail, as: 'productionOrderDetails' }],
      transaction
    });

    if (!existingOrder) {
      throw new Error('Orden de producción no encontrada');
    }

    // Verificar si el estado está cambiando a "Terminado" (id 7)
    const isStatusChangingToFinished = data.state === 7 && existingOrder.state !== 7;

    // Actualizar la orden de producción
    await models.ProductionOrder.update(data, {
      where: { id },
      transaction
    });

    // Separar detalles existentes de los nuevos detalles
    const existingDetails = data.productionOrderDetails.filter(detail => detail.id);
    const newDetails = data.productionOrderDetails.filter(detail => !detail.id);

    // Obtener los IDs de los detalles enviados en la solicitud
    const updatedDetailIds = existingDetails.map(detail => detail.id);

    // Eliminar detalles que existen en la base de datos pero no en la solicitud
    const detailsToDelete = existingOrder.productionOrderDetails.filter(
      dbDetail => !updatedDetailIds.includes(dbDetail.id)
    );

    for (const detail of detailsToDelete) {
      await models.ProductionOrderDetail.destroy({
        where: { id: detail.id },
        transaction
      });
    }

    // Actualizar detalles existentes
    for (const detail of existingDetails) {
      await models.ProductionOrderDetail.update(
        { idProduct: detail.idProduct, amount: detail.amount, state: detail.state },
        { where: { id: detail.id }, transaction }
      );
    }

    // Crear nuevos detalles
    if (newDetails.length > 0) {
      const newDetailRecords = newDetails.map(detail => ({
        idProductionOrder: id,
        idProduct: detail.idProduct,
        amount: detail.amount,
        state: detail.state || 1,
      }));
      await models.ProductionOrderDetail.bulkCreate(newDetailRecords, { transaction });
    }

    // Si el estado cambia a "Terminado", actualizar el stock de los productos
    if (isStatusChangingToFinished) {
      for (const detail of existingOrder.productionOrderDetails) {
        const { idProduct, amount } = detail;
        await models.Product.update(
          { stock: sequelize.literal(`stock + ${amount}`) },
          { where: { id: idProduct }, transaction }
        );
      }
    }

    // Confirmar la transacción
    await transaction.commit();

    return { success: true };
  } catch (error) {
    // Revertir la transacción en caso de error
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error("Error al actualizar la orden de producción:", error);
    return { success: false, error };
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