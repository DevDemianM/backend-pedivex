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

/* ESTE BLOQUE FUNCIONA PERO SIN EL CALCULO DE TOTAL 
const createRequest = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { creationDate, idUser, total, state, deadLine, stateDate, details } = data;

        // Crea la solicitud
        const request = await models.Request.create({
            creationDate,
            idUser,
            total,
            state,
            deadLine,
            stateDate
        }, { transaction });

        // Crea los detalles de la solicitud
        const requestDetails = details.map(detail => ({
            ...detail,
            idRequest: request.id
        }));
        await models.RequestDetail.bulkCreate(requestDetails, { transaction });

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
*/

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
    return await models.Request.update(data, {
        where: { id }
    });
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
