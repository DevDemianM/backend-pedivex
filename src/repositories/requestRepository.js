const sequelize = require('../config/database');
const { models } = require('../models');
const { createSale } = require('./saleRepository'); // Ajusta la ruta si es necesario


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
    const { creationDate, idUser, state, deadLine, stateDate, requestDetails } = data;

    // Obtener los precios actuales de los productos involucrados en los detalles
    const productIds = requestDetails.map(detail => detail.idProduct);
    const products = await models.Product.findAll({
      where: { id: productIds },
      transaction
    });

    // Recalcular el total
    let total = 0;
    const updatedDetails = requestDetails.map(detail => {
      const product = products.find(prod => prod.id === detail.idProduct);
      const price = product ? parseFloat(product.price) : 0;
      const subtotal = price * detail.quantity;
      total += subtotal;
      return { ...detail, subtotal, total: subtotal };
    });

    // Actualizar los datos del pedido
    await models.Request.update(
      { creationDate, idUser, total, state, deadLine, stateDate },
      { where: { id }, transaction }
    );

    // Actualizar y crear detalles
    const existingDetails = updatedDetails.filter(detail => detail.id);
    const newDetails = updatedDetails.filter(detail => !detail.id);
    for (const detail of existingDetails) {
      await models.RequestDetail.update(
        { idProduct: detail.idProduct, quantity: detail.quantity, price: detail.price, subtotal: detail.subtotal, total: detail.total },
        { where: { id: detail.id }, transaction }
      );
    }
    if (newDetails.length > 0) {
      const newDetailRecords = newDetails.map(detail => ({
        idRequest: id, idProduct: detail.idProduct, quantity: detail.quantity, price: detail.price, subtotal: detail.subtotal, total: detail.total
      }));
      await models.RequestDetail.bulkCreate(newDetailRecords, { transaction });
    }

    // Crear venta si el estado es "Terminado"
    if (state === 7) {
      const saleData = {
        deliveryDate: new Date(),
        total: total,
        state: 7,
        idUser: idUser,
        details: updatedDetails.map(detail => ({
          idProduct: detail.idProduct,
          amount: detail.quantity
        }))
      };
      await createSale(saleData); // Llama a la función para crear la venta
    }

    // Confirmar la transacción
    await transaction.commit();
    return { success: true, message: "Pedido actualizado correctamente" };
  } catch (error) {
    if (!transaction.finished) await transaction.rollback();
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
