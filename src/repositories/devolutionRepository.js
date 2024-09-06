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

    const devolution = await models.Devolution.create(
      { idSale, date, state },
      { transaction }
    );

    const details = devolutionDetails.map(detail => ({
      ...detail,
      idDevolution: devolution.id
    }));

    await models.DevolutionDetails.bulkCreate(details, { transaction });
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
