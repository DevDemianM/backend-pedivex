const { models } = require('../models');

const getAllDatasheetDetails = async () => {
  return await models.DatasheetDetail.findAll({
    include: [{
      model: models.Supply,
      attributes: ['name']
    }]
  });
}

const createDatasheetDetail = async (data) => {
  return await models.DatasheetDetail.create(data);
}

const updateDatasheetDetail = async (data) => {
  return await models.DatasheetDetail.update(data);
}

models.exports = {
  getAllDatasheetDetails,
  createDatasheetDetail,
  updateDatasheetDetail
};
