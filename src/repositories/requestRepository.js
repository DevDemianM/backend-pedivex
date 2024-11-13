const sequelize = require('../config/database');
const { models } = require('../models');

const getAllRequests = async () => {
    return await models.Request.findAll({
        include: [models.RequestDetail],
    });
};

const getRequestById = async (id) => {
    return await models.Request.findByPk(id, {
        include: [models.RequestDetail]
    });
};



const createRequest = async (data) => {
    const transaction = await sequelize.transaction();
    try {
      const { creationDate, idUser, state, deadLine, stateDate, details } = data;
  
      // Obtener precios de los productos desde la tabla de productos
      const productIds = details.map(detail => detail.idProduct);
      const products = await models.Product.findAll({
        where: {
          id: productIds
        },
        transaction
      });
  
      // Calcular el total basado en los precios y cantidades
      let total = 0;
      const requestDetails = details.map(detail => {
        const product = products.find(prod => prod.id === detail.idProduct);
        const price = product ? parseFloat(product.price) : 0;
        const subtotal = price * detail.quantity;
  
        total += subtotal;
  
        return {
          ...detail,
          idRequest: null, // Este valor será asignado luego de crear la solicitud
          subtotal,
          total: subtotal
        };
      });
  
      // Crea la solicitud con el total calculado
      const request = await models.Request.create({
        creationDate,
        idUser,
        total, // Asignar el total calculado
        state,
        deadLine,
        stateDate
      }, { transaction });
  
      // Actualizar el campo idRequest en los detalles y crear los detalles
      const updatedRequestDetails = requestDetails.map(detail => ({
        ...detail,
        idRequest: request.id
      }));
      await models.RequestDetail.bulkCreate(updatedRequestDetails, { transaction });
  
      // Confirma la transacción
      await transaction.commit();
  
      return { success: true, request };
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      console.error('Error al crear la solicitud y detalles:', error);
      return { success: false, error };
    }
};
  

const updateRequest = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    // Obtener el pedido existente y sus detalles
    const existingRequest = await models.Request.findByPk(id, {
      include: [{ model: models.RequestDetail, as: 'requestDetails' }],
      transaction
    });

    if (!existingRequest) {
      throw new Error('Pedido no encontrado');
    }

    // Actualizar los campos del pedido principal
    await models.Request.update(
      {
        idUser: data.idUser,
        total: data.total,
        state: data.state,
        creationDate: data.creationDate,
        deadLine: data.deadLine,
        stateDate: data.stateDate,
      },
      { where: { id }, transaction }
    );

    // Separar detalles existentes de los nuevos detalles
    const existingDetails = data.requestDetails.filter(detail => detail.id);
    const newDetails = data.requestDetails.filter(detail => !detail.id);

    // Obtener los IDs de los detalles enviados en la solicitud
    const updatedDetailIds = existingDetails.map(detail => detail.id);

    // Eliminar detalles que existen en la base de datos pero no en la solicitud
    const detailsToDelete = existingRequest.requestDetails.filter(
      dbDetail => !updatedDetailIds.includes(dbDetail.id)
    );

    for (const detail of detailsToDelete) {
      await models.RequestDetail.destroy({
        where: { id: detail.id },
        transaction
      });
    }

    // Actualizar detalles existentes
    for (const detail of existingDetails) {
      await models.RequestDetail.update(
        {
          idProduct: detail.idProduct,
          quantity: detail.quantity,
          price: detail.price,
          subtotal: detail.subtotal,
        },
        { where: { id: detail.id }, transaction }
      );
    }

    // Crear nuevos detalles
    if (newDetails.length > 0) {
      const newDetailRecords = newDetails.map(detail => ({
        idRequest: id,
        idProduct: detail.idProduct,
        quantity: detail.quantity,
        price: detail.price,
        subtotal: detail.subtotal,
      }));
      await models.RequestDetail.bulkCreate(newDetailRecords, { transaction });
    }

    // Confirmar la transacción
    await transaction.commit();
    return { success: true, message: "Pedido actualizado correctamente" };
  } catch (error) {
    // Si hay un error, revertir la transacción
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw new Error("Error al actualizar el pedido: " + error.message);
  }
};



const deleteRequest = async (id) => {
    return await models.Request.destroy({
        where: { id }
    });
};

module.exports = {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
};
