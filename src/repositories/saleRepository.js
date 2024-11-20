const sequelize = require('../config/database');
const { models } = require('../models');

const getAllSales = async () => {
  return await models.Sale.findAll({
    include: [
      {
        model: models.SaleDetail,
        include: [
          {
            model: models.Product,
            attributes: ['name']
          }
        ]
      },
      {
        model: models.User
      }
    ],
  });
};

const getSaleById = async (id) => {
  return await models.Sale.findByPk(id, {
    include: [
      {
        model: models.SaleDetail,
        include: [
          {
            model: models.Product,
            attributes: ['name']
          }
        ]
      },
      {
        model: models.User
      }
    ],
  });
};

const createSale = async (data, transaction) => {
  try {
    const { deliveryDate, total, state, idUser, details } = data;

    // Crear la venta
    const sale = await models.Sale.create(
      {
        deliveryDate,
        total,
        state,
        idUser,
      },
      { transaction }
    );

    // Crear los detalles de la venta
    const saleDetails = details.map((detail) => ({
      idSale: sale.id,
      idProduct: detail.idProduct,
      amount: detail.amount,
    }));

    await models.SaleDetail.bulkCreate(saleDetails, { transaction });

    // No confirmamos ni revertimos la transacción aquí, se maneja externamente
    return { success: true, sale };
  } catch (error) {
    console.error("Error al crear venta y detalles:", error);
    // Lanzamos el error para que sea manejado por la función que llama
    throw error;
  }
};

const updateSale = async (id, data) => {
  return await models.Sale.update(data, {
    where: { id }
  });
};

const deleteSale = async (id) => {
  return await models.Sale.destroy({
    where: { id }
  });
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
}