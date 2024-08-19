const { models } = require('../models');

const getAllMotiveDevolutions = async () => {
    return await models.MotiveDevolution.findAll();
};

const createMotiveDevolutions = async (data) => {
    return await models.MotiveDevolution.create(data);
  };



module.exports = {
    getAllMotiveDevolutions,
    createMotiveDevolutions
};