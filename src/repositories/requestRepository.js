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

    // Obtener productos involucrados en la solicitud
    const productIds = details.map(detail => detail.idProduct);
    const products = await models.Product.findAll({
      where: {
        id: productIds
      },
      transaction
    });

    // Verificar disponibilidad de stock
    for (const detail of details) {
      const product = products.find(prod => prod.id === detail.idProduct);
      if (!product) {
        throw new Error(`Producto con ID ${detail.idProduct} no encontrado.`);
      }

      if (product.stock < detail.quantity) {
        throw new Error(
          `El producto "${product.name}" no tiene suficiente stock. Stock disponible: ${product.stock}, solicitado: ${detail.quantity}.`
        );
      }
    }

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

    // Crear la solicitud
    const request = await models.Request.create(
      {
        creationDate,
        idUser,
        total,
        state,
        deadLine,
        stateDate
      },
      { transaction }
    );

    // Crear detalles de la solicitud
    const updatedRequestDetails = requestDetails.map(detail => ({
      ...detail,
      idRequest: request.id
    }));
    await models.RequestDetail.bulkCreate(updatedRequestDetails, { transaction });

    // Confirmar la transacción
    await transaction.commit();

    return { success: true, request };
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error("Error al crear la solicitud y detalles:", error);
    return { success: false, error: error.message };
  }
};

  
const updateRequest = async (id, data) => {
  const { creationDate, idUser, state, deadLine, stateDate, requestDetails } = data;

  // Iniciar la transacción principal
  const transaction = await sequelize.transaction();
  try {
    // Obtener los productos involucrados sin bloquear filas
    const productIds = requestDetails.map((detail) => detail.idProduct);
    const products = await models.Product.findAll({
      where: { id: productIds },
      transaction,
    });

    // Recalcular el total y validar stock si el estado es "Terminado"
    let total = 0;
    for (const detail of requestDetails) {
      const product = products.find((p) => p.id === detail.idProduct);
      if (!product) {
        throw new Error(`Producto con ID ${detail.idProduct} no encontrado.`);
      }
      const price = parseFloat(product.price);
      const subtotal = price * detail.quantity;
      total += subtotal;
      detail.price = price;
      detail.subtotal = subtotal;

      if (state === 7 && product.stock < detail.quantity) {
        throw new Error(
          `Stock insuficiente para el producto "${product.name}". Disponible: ${product.stock}, Requerido: ${detail.quantity}`
        );
      }
    }

    // Actualizar el pedido
    await models.Request.update(
      { creationDate, idUser, total, state, deadLine, stateDate },
      { where: { id }, transaction }
    );

    // Actualizar y crear detalles del pedido
    const existingDetails = requestDetails.filter((detail) => detail.id);
    const newDetails = requestDetails.filter((detail) => !detail.id);

    for (const detail of existingDetails) {
      await models.RequestDetail.update(
        {
          idProduct: detail.idProduct,
          quantity: detail.quantity,
          price: detail.price,
          subtotal: detail.subtotal,
          total: detail.subtotal,
        },
        { where: { id: detail.id }, transaction }
      );
    }

    if (newDetails.length > 0) {
      const newDetailRecords = newDetails.map((detail) => ({
        idRequest: id,
        idProduct: detail.idProduct,
        quantity: detail.quantity,
        price: detail.price,
        subtotal: detail.subtotal,
        total: detail.subtotal,
      }));
      await models.RequestDetail.bulkCreate(newDetailRecords, { transaction });
    }

    // Confirmar la transacción principal
    await transaction.commit();

    // Si el estado es "Terminado", reducir stock y crear venta
    if (state === 7) {
      // Iniciar una nueva transacción para stock y venta
      const saleTransaction = await sequelize.transaction();
      try {
        // Bloquear filas de productos para actualización de stock
        const productsToUpdate = await models.Product.findAll({
          where: { id: productIds },
          transaction: saleTransaction,
          lock: saleTransaction.LOCK.UPDATE,
        });

        // Reducir stock
        for (const detail of requestDetails) {
          const product = productsToUpdate.find((p) => p.id === detail.idProduct);
          if (product.stock < detail.quantity) {
            throw new Error(
              `Stock insuficiente para el producto "${product.name}". Disponible: ${product.stock}, Requerido: ${detail.quantity}`
            );
          }

          await product.update(
            { stock: product.stock - detail.quantity },
            { transaction: saleTransaction }
          );
        }

        // Crear la venta utilizando la misma transacción
        const saleData = {
          deliveryDate: new Date(),
          total: total,
          state: 7,
          idUser: idUser,
          details: requestDetails.map((detail) => ({
            idProduct: detail.idProduct,
            amount: detail.quantity,
          })),
        };
        await createSale(saleData, saleTransaction);

        // Confirmar la transacción de stock y venta
        await saleTransaction.commit();
      } catch (error) {
        // Revertir la transacción de stock y venta
        if (!saleTransaction.finished) await saleTransaction.rollback();
        throw error;
      }
    }

    return { success: true, message: "Pedido actualizado correctamente" };
  } catch (error) {
    // Revertir la transacción principal
    if (!transaction.finished) await transaction.rollback();
    console.error("Error al actualizar el pedido:", error);
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
