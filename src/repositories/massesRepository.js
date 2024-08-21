const { models } = require('../models');
const sequelize = require('../config/database');

const getAllMasses = async () => {
  return await models.Mass.findAll({
    include: [
      {
        model: models.MassDetail,
        include: [
          {
            model: models.Supply,
            attributes: ['name']
          }
        ]
      }
    ]
  });
}

const getMassById = async (id) => {
  return await models.Mass.findByPk(id, {
    include: [
      {
        model: models.BoughtDetail,
        include: [
          {
            model: models.Supply,
            attributes: ['name']
          }
        ]
      }
    ]
  });
}

const createMass = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      notes,
      details
    } = data;

    const mass = await models.Mass.create({
      name,
      notes
    }, { transaction });

    const massDetails = details.map(detail => ({
      ...detail,
      idMass: mass.id
    }));
    await models.MassDetail.bulkCreate(massDetails, { transaction });

    await transaction.commit();

    return { success: true, mass };
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear Mass y sus detalles:', error);
    return { success: false, error };
  }
};

const updateMass = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, notes, details } = data;

    const mass = await models.Mass.update(
      {
        name,
        notes
      },
      {
        where: { id },
        transaction
      }
    );

    await models.MassDetail.destroy({
      where: { idMass: id },
      transaction
    });

    const massDetails = details.map(detail => ({
      ...detail,
      idMass: id
    }));

    await models.MassDetail.bulkCreate(massDetails, { transaction });

    await transaction.commit();

    return { success: true, mass };
  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar Mass y sus detalles:', error);
    return { success: false, error };
  }
};

module.exports = {
  getAllMasses,
  getMassById,
  createMass,
  updateMass
}