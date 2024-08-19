const { models } = require('../models');
const sequelize = require('../config/database');

const getAllDatasheets = async () => {
  return await models.Datasheet.findAll({
    include: [{
      model: models.DatasheetDetail,
      include: [{
        model: models.Supply,
        attributes: ['name']
      }],
    }]
  });
};

const getDatasheetById = async (id) => {
  return await models.Datasheet.findByPk(id, {
    include: [{
      model: models.DatasheetDetail,
      include: [{
        model: models.Supply,
        attributes: ['name']
      }]
    }]
  });
}

const createDatasheet = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      idMass,
      details
    } = data;

    const startDate = Date.now()
    const endDate = null;

    const datasheet = await models.Datasheet.create({
      idMass,
      startDate,
      endDate
    }, { transaction });

    const datasheetDetails = details.map(detail => ({
      ...detail,
      idDatasheet: datasheet.id
    }));
    
    await models.DatasheetDetail.bulkCreate(datasheetDetails, { transaction });

    await transaction.commit();

    return { success: true, datasheet };
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear Datasheet y sus detalles:', error);
    return { success: false, error };
  }
}

const updateDatasheet = async (id, data) => {
  const transaction = await sequelize.transaction();
  try {
    const { idMass, startDate, endDate, details } = data;

    const datasheet = await models.Datasheet.update(
      {
        idMass,
        startDate,
        endDate
      },
      {
        where: { id },
        transaction
      }
    );

    await models.DatasheetDetail.destroy({
      where: { idDatasheet: id },
      transaction
    });

    const datasheetDetails = details.map(detail => ({
      ...detail,
      idDatasheet: id
    }));

    await models.DatasheetDetail.bulkCreate(datasheetDetails, { transaction });

    await transaction.commit();

    return { success: true, datasheet };
  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar Datasheet y sus detalles:', error);
    return { success: false, error };
  }
};

module.exports = {
  getAllDatasheets,
  getDatasheetById,
  createDatasheet,
  updateDatasheet
};
