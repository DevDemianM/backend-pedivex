const { models } = require('../models');
const sequelize = require('../config/database');

const getAllDevolutions = async () => {
  return await models.Devolution.findAll({
    include: [
      {
        model: models.DevolutionDetails, // Modelo para los detalles de devolución
        as: 'details', // Alias para la asociación
        include: [
          {
            model: models.Product, // Incluir productos asociados
            as: 'product', // Alias para la asociación
          },
          {
            model: models.MotiveDevolution, // Incluir motivos de devolución asociados
            as: 'motiveDevolution', // Alias para la asociación
          },
        ],
      },
    ],
  });
};


const getDevolutionById = async (id) => {
  return await models.Devolution.findByPk(id, {
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

const createDevolution = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { idSale, devolutionDetails } = data;
    const date = new Date();
    const state = 1;

    // Crear la devolución
    const devolution = await models.Devolution.create(
      { idSale, date, state },
      { transaction }
    );

    // Preparar detalles de devolución
    const details = devolutionDetails.map(detail => ({
      ...detail,
      idDevolution: devolution.id
    }));

    // Crear detalles de devolución
    await models.DevolutionDetails.bulkCreate(details, { transaction });

    // Actualizar el stock de los productos
    for (const detail of devolutionDetails) {
      const { idProduct, quantity, changedProduct, changedQuantity } = detail;

      // Actualizar stock del producto devuelto
      await models.Product.update(
        { stock: sequelize.literal(`stock + ${quantity}`) },
        { where: { id: idProduct }, transaction }
      );

      // Actualizar stock del producto cambiado
      await models.Product.update(
        { stock: sequelize.literal(`stock - ${changedQuantity}`) },
        { where: { id: changedProduct }, transaction }
      );
    }

    await transaction.commit();

    return { success: true, devolution };
  } catch (error) {
    await transaction.rollback();
    return { success: false, error };
  }
};


module.exports = {
  getAllDevolutions,
  getDevolutionById,
  createDevolution
};
