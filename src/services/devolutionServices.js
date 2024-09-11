const devolutionRepository = require('../repositories/devolutionRepository');

const getAllDevolutions = async () => {
  return await devolutionRepository.getAllDevolutions();
}

const getDevolutionById = async (id) => {
  return await devolutionRepository.getDevolutionById(id);
}

const createDevolution = async (data) => {
  return await devolutionRepository.createDevolution(data);
}

module.exports = {
  getAllDevolutions,
  getDevolutionById,
  createDevolution
};
