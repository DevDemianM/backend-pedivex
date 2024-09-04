const { models } = require('../models');
const sequelize = require('../config/database');

const getAllDevolutions = async () => {
  return await models.Devolution.findAll({
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
};

const getAllDevolutionById = async (id) => {
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
    const {
      idSale,
      details
    } = data;

    const date = Date.now();
    const state = 1;

    const devolution = await models.Devolution.create({
      idSale,
      date,
      state
    }, { transaction });

    const devolutionDetails = details.map(detail => ({
      ...detail,
      idDevolution: devolution.id
    }));

    await models.DevolutionDetails.bulkCreate(
      devolutionDetails,
      { transaction });

    await transaction.commit();

    const devolutionCreated = await getAllDevolutionById(devolution.id);


    return { succes: true, devolutionCreated }

  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear la devolucion y sus detalles:', error);
    return { success: false, error };
  }
}


module.exports = {
  getAllDevolutions,
  getAllDevolutionById,
  createDevolution,
};
