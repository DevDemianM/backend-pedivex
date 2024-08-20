const { models } = require('../models');

const getAllDevolutions = async () => {
  return await models.Devolution.findAll({
    include: [models.MotiveDevolution]
  });
}

const createDevolution = async (data) => {
  return await models.Devolution.create(data);
}

module.exports = {
  getAllDevolutions,
  createDevolution
};