const { models } = require('../models');

const getAllMassDetails = async () => {
  return await models.MassDetail.findAll({
    include: [{
      model: models.Supply,
      attributes: ['name']
    }]
  });
}

const createMassDetail = async (data) => {
  return await models.MassDetail.create(data);
}

const updateMassDetail = async (data) => {
  return await models.MassDetail.update(data);
}

models.exports = {
  getAllMassDetails,
  createMassDetail,
  updateMassDetail
};
